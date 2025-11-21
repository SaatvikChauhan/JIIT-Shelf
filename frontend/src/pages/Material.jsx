import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Disclaimer from "../components/Disclaimer";
import MaterialSection from "../components/MaterialSection";
import Youtube from "../components/Youtube";
import CourseDesc from "../components/CourseDesc";
import api from "../lib/axios.js";
import { parseSubjectName } from "../lib/utils.js";
import { ORDER } from "../data/data.js";
import toast from "react-hot-toast";

const Material = () => {
  const navigate = useNavigate();
  const sub = JSON.parse(localStorage.getItem("selectedSubject"));
  const { code, title, icon } = parseSubjectName(sub.name);
  const { folderId } = useParams();

  const [subfolders, setSubfolders] = useState([]);
  const [cdUrl, setCdUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = `material_${folderId}`;

    const loadFromCache = () => {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return null;
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    };

    const saveToCache = (data) => {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    };

    const fetchFirstLevel = async () => {
      const cached = loadFromCache();
      if (cached) {
        setCdUrl(cached.cdUrl);
        setSubfolders(cached.subfolders);
        setLoading(false);
      }

      // refresh cache
      try {
        const res = await api.get(`/drive/${folderId}`);
        let items = res.data || [];

        let cd = "";
        items.forEach((item) => {
          if (item.name === "cd.pdf") cd = item.id;
        });

        let list = items.filter((item) => item.name !== "cd.pdf");

        list.sort((a, b) => {
          const aOrder = ORDER[a.name] || 999;
          const bOrder = ORDER[b.name] || 999;
          return aOrder - bOrder;
        });

        saveToCache({
          cdUrl: cd,
          subfolders: list,
        });

        setCdUrl(cd);
        setSubfolders(list);
      } catch (err) {
        console.error("Error fetching folders:", err);
        toast.error("Error fetching folders");

      } finally {
        setLoading(false);
      }
    };

    fetchFirstLevel();
  }, [folderId]);

  const sem = localStorage.getItem("sem");

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
        </div>

        <div id="material-main">
          {loading && (
            <div className="loading loading-dots w-8 self-center"></div>
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
