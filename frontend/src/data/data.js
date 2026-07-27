export const branchSemMap = {
  "CSE": [1, 2, 3, 4],
  "ECE": [1, 2, 3, 4],
  "IT": [1, 2, 3, 4],
  "Mathematics and Computing (M&C)": [1, 2, 3, 4],
  "Robotics and Artificial Intelligence": [1, 2],
};

export const semIdMap = {
  "common-1": "1wcqXk9t5TfZjwpW2rvjBMKXwwWIrQ4ca",
  "common-2": "1Rb23Q-_-hZ0NCNPNlPJ9e4px2-wikiVB",
  
  "CSE-3": "1mfEfqFWJ3NkeYmdjM1-YED0GZ9q3Qvt2",
  "CSE-4": "1A9FLeKbVnJXS3W5h9iUi2s6tvxqQdC84",
  
  "ECE-3": "13XNlX0YAwTKc_LC-jregRn56-VMS3O6g",
  "ECE-4": "1fCCMB2vHFB7-rqpz9gDu9SeAVbnCfjeP",
};

export const getFolderId = (branch, semester) => {
  const semStr = String(semester);
  
  if (semStr === "1") return semIdMap["common-1"];
  if (semStr === "2") return semIdMap["common-2"];
  
  if (semStr === "3" || semStr === "4") {
    const sharedGroup = ["CSE", "IT", "Mathematics and Computing (M&C)"];
    if (sharedGroup.includes(branch)) {
      return semIdMap[`CSE-${semStr}`] || null;
    }
  }

  return semIdMap[`${branch}-${semStr}`] || null;
};

export const iconMap = {
    "Lectures": "Notebook",
    "Tutorials": "PencilLine",
    "PYQs": "Folders",
    "Books": "LibraryBig"
}

export const ORDER = {
  "Lectures": 1,
  "Lectures-T1": 1,
  "Lectures-T2": 2,
  "Lectures-T3": 3,

  "Module 1": 4,
  "Module 2": 5,
  "Module 3": 6,
  "Module 4": 7,
  "Module 5": 8,
  "Module 6": 9,

  "Tutorials": 10,
  "Assignments": 10,
  "PYQs": 11,
  "yt.txt": 12,
  "Books": 13,
};
