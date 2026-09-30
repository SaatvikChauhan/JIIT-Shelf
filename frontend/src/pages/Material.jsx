import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { FileUp } from "lucide-react";
import Disclaimer from "../components/Disclaimer";
import MaterialSection from "../components/MaterialSection";
import Youtube from "../components/Youtube";
import CourseDesc from "../components/CourseDesc";
import { getDrive, peekDrive } from "../lib/driveCache.js";
import { isDriveItemList, parseSubjectName } from "../lib/utils.js";
import { compareSections } from "../lib/materials.js";
import Skeletons from "../components/Skeletons.jsx";
import toast from "react-hot-toast";
import { readJSON, readStorage } from "../lib/storage.js";

const Material = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const sub = readJSON("selectedSubject");
  const { code, title } = parseSubjectName(sub?.id === folderId ? sub.name : "");
  const contributionParams = new URLSearchParams();
  const storedBranch = readStorage("selectedBranch");
  const storedSemester = readStorage("selectedSemester");
  if (storedBranch) contributionParams.set("branch", storedBranch);
  if (storedSemester) contributionParams.set("semester", storedSemester);
  contributionParams.set("course", folderId);

  const [subfolders, setSubfolders] = useState([]);
  const [cdUrl, setCdUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFirstLevel = async () => {
      const cached = peekDrive(folderId);
      if (isDriveItemList(cached)) {
        setCdUrl(cached.find(item => item.name === "cd.pdf")?.id || "");
        setSubfolders(cached.filter(item => item.name !== "cd.pdf").sort(compareSections));
        setLoading(false);
      } else {
        setCdUrl("");
        setSubfolders([]);
        setLoading(true);
      }

      try {
        const res = await getDrive(folderId);
        if (controller.signal.aborted) return;
        let items = res.data || [];

        let cd = "";
        items.forEach((item) => {
          if (item.name === "cd.pdf") cd = item.id;
        });

        let list = items.filter((item) => item.name !== "cd.pdf");

        list.sort(compareSections);


        setCdUrl(cd);
        setSubfolders(list);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Error fetching folders:", err);
        toast.error("Error fetching folders");

      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchFirstLevel();
    return () => controller.abort();
  }, [folderId]);

  return (
    <>
      <main className="page-padding">
        <div className="page-header">
          <button
            className="change"
            onClick={() =>
              navigate(-1, { state: { fromMaterial: true } })
            }
          >
            ← Back
          </button>

          <div id="subject-details">
            <h2 className="subject-title">
              {title}
              <br />
              <span id="code">{code}</span>
            </h2>
          </div>
          <Link className="context-contribute" to={`/contribute?${contributionParams}`}><FileUp size={15} /> Contribute to this course</Link>
        </div>

        <div id="material-main">
          {loading && (
            <Skeletons kind="sections" count={5} />
          )}

          {!loading && (
            <>
              <CourseDesc cdURL={cdUrl} />

              {subfolders.map((folder) => {
                if (folder.name === "yt.txt") {
                  return <Youtube key={folder.id} fileId={folder.id} />;
                } else if (folder.name !== "cd.pdf") {
                  return (
                    <MaterialSection
                      key={folder.id}
                      type={folder.name}
                      folderId={folder.id}
                    />
                  );
                }
              })}

              <Disclaimer />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Material;
