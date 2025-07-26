document.addEventListener("DOMContentLoaded", () => {
    const subject = JSON.parse(localStorage.getItem("selectedSubject"));

    const titleEl = document.querySelector(".subject-title");
    const codeEl = document.getElementById("code");
    const materialMain = document.getElementById("material-main");

    if (!subject) {
        titleEl.textContent = "Subject not found.";
        codeEl.textContent = "";
        return;
    }

    titleEl.firstChild.textContent = subject.name;
    codeEl.textContent = subject.code;

    const material = materialMap[subject.code];

    if (!material) {
        materialMain.innerHTML = `<p>No material available for ${subject.name}.</p>`;
        return;
    }

    function createCourseDesc(cdURL) {
        if (cdURL === "") {}
        else {
            const cdAnchor = document.createElement("a");
            cdAnchor.href = cdURL;
            cdAnchor.setAttribute("target", "_blank");
            cdAnchor.setAttribute("title", "Download");
            cdAnchor.setAttribute("id", "cd");
            cdAnchor.innerHTML = `
        <i data-lucide="download" class="ac-icon"></i>
        Course Description
        `;
            materialMain.append(cdAnchor);
        }
    }
    function createMaterialSection(type, iconName, links) {
        if (iconName === "youtube") {
            const section = document.createElement("div");
            section.classList.add("material-section");

            section.innerHTML = `
            <button class="material-dropdown-btn" onclick="toggleSection(this)">
                <span class="material-type">
                    <i data-lucide="${iconName}" class="icon-detail"></i> ${type}
                </span>
                <i data-lucide="chevron-down" class="chevron-icon"></i>
            </button>
            <div class="material-content">
                ${links.length == 0 ? `<p>No content available.</p>` :
                    links.map((link) => `
                            <a href="${link.url}" class="material-link" target="_blank">
                                <div class = "yt-logo" style = "background-image: url('${link.logo}')"></div>
                                ${link.title}
                            </a>
                        `).join("")
                }
            </div>
        `;

            materialMain.append(section);
        }
        else {
            const section = document.createElement("div");
            section.classList.add("material-section");

            section.innerHTML = `
            <button class="material-dropdown-btn" onclick="toggleSection(this)">
                <span class="material-type">
                    <i data-lucide="${iconName}" class="icon-detail"></i> ${type}
                </span>
                <i data-lucide="chevron-down" class="chevron-icon"></i>
            </button>
            <div class="material-content">
                ${links.length == 0 ? `<p>No content available.</p>` :
                    links.map((link) => `
                            <a href="${link.url}" class="material-link" target="_blank">
                                ${link.title}
                            </a>
                        `).join("")
                }
            </div>
        `;

            materialMain.append(section);
        }
    }
    function createDisclaimer() {
        const discl = document.createElement("div");
        discl.classList.add("material-disclaimer");
        discl.innerHTML = `
        <i data-lucide="pin" class="icon-detail"></i>
        <p> While every effort has been made to curate accurate and helpful content, some materials may be outdated or contain errors. Please verify with faculty or the most recent official resources.
        </p>
        `;
        materialMain.append(discl);
    }

    materialMain.innerHTML = "";

    const isLab = subject.isLab;
    if (isLab && subject.code !== "24B11HS111") {
        createCourseDesc(material.courseDesc);
        createMaterialSection("Lectures", "notebook", material.lectures);
        createMaterialSection("Assignments", "pencil-line", material.assignments);
        createMaterialSection("Previous Year Questions", "folders", material.pyqs);
        createDisclaimer();
    }
    else {
        createCourseDesc(material.courseDesc);
        createMaterialSection("Lectures", "notebook", material.lectures);
        createMaterialSection("Tutorial Sheets", "pencil-line", material.tutorials);
        createMaterialSection("Previous Year Questions", "folders", material.pyqs);
        createMaterialSection("YouTube Resources", "youtube", material.youtube);
        createMaterialSection("Books", "library-big", material.books);
        createDisclaimer();
    }

    lucide.createIcons();
});
