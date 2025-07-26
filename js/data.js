const subjectMap = {
    CSE: {
        "1": [
            { code: "15B11CI111", name: "SDF I", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS111", name: "SDF Lab I", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH111", name: "Physics I", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH171", name: "Physics Lab I", icon: "beaker", credits: 1, isLab: true },
            { code: "24B11EC111", name: "Basic Electronics", icon: "cpu", credits: 4, isLab: false },
            { code: "24B15EC111", name: "Basic Electronics Lab", icon: "cable", credits: 1, isLab: true },
            { code: "15B11MA111", name: "Mathematics I", icon: "function-square", credits: 4, isLab: false },
            { code: "18B15GE111", name: "Engineering Drawing & Design", icon: "ruler", credits: 1.5, isLab: true },
            { code: "15B11HS112", name: "English", icon: "book-text", credits: 2, isLab: true }
        ],
        "2": [
            { code: "15B11CI211", name: "SDF II", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS121", name: "SDF Lab II", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH211", name: "Physics II", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH271", name: "Physics Lab II", icon: "beaker", credits: 1, isLab: true },
            { code: "15B11MA211", name: "Mathematics II", icon: "function-square", credits: 4, isLab: false },
            { code: "24B11HS111", name: "Universal Human Values (UHV)", icon: "handshake", credits: 3, isLab: true },
            { code: "18B15GE112", name: "Workshop", icon: "ruler", credits: 1.5, isLab: true },
            { code: "24B16HS111", name: "Life Skills & Prof. Comm. Lab (LSPC)", icon: "book-text", credits: 0, isLab: true }
        ],
        "3": [
            { code: "15B11HS211", name: "Economics", icon: "square-sigma", credits: 3 },
            { code: "15B11CI311", name: "Data Structures", icon: "square-code", credits: 4 },
            { code: "15B17CI371", name: "Data Structures Lab", icon: "laptop-minimal", credits: 1, isLab: true },
            { code: "24B15CS214", name: "Unix Programming Lab", icon: "terminal", credits: 2, isLab: true },
            { code: "24B11CS212", name: "Theory of Computation", icon: "book", credits: 3 },
            { code: "24B11CS213", name: "Database Management Systems", icon: "database", credits: 3 },
            { code: "24B15CS213", name: "Database Management Systems Lab", icon: "computer", credits: 1, isLab: true },
            { code: "25B11MA213", name: "Mathematical Foundations for AI and Data Science", icon: "function-square", credits: 4 },
            { code: "24B15CS215", name: "Object Oriented Programming using Java", icon: "code-2", credits: 1, isLab: true }

        ]
    },
    ECE: {
        "1": [
            { code: "15B11CI111", name: "SDF I", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS111", name: "SDF Lab I", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH111", name: "Physics I", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH171", name: "Physics Lab I", icon: "beaker", credits: 1, isLab: true },
            { code: "24B11EC111", name: "Basic Electronics", icon: "cpu", credits: 4, isLab: false },
            { code: "24B15EC111", name: "Basic Electronics Lab", icon: "cable", credits: 1, isLab: true },
            { code: "15B11MA111", name: "Mathematics I", icon: "function-square", credits: 4, isLab: false },
            { code: "18B15GE111", name: "Engineering Drawing & Design", icon: "ruler", credits: 1.5, isLab: true },
            { code: "15B11HS112", name: "English", icon: "book-text", credits: 2, isLab: true }
        ],
        "2": [
            { code: "15B11CI211", name: "SDF II", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS121", name: "SDF Lab II", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH211", name: "Physics II", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH271", name: "Physics Lab II", icon: "beaker", credits: 1, isLab: true },
            { code: "15B11MA211", name: "Mathematics II", icon: "function-square", credits: 4, isLab: false },
            { code: "24B11HS111", name: "Universal Human Values (UHV)", icon: "handshake", credits: 3, isLab: true },
            { code: "18B15GE112", name: "Workshop", icon: "ruler", credits: 1.5, isLab: true },
            { code: "24B16HS111", name: "Life Skills & Prof. Comm. Lab (LSPC)", icon: "book-text", credits: 0, isLab: true }
        ]
    },
    IT: {
        "1": [
            { code: "15B11CI111", name: "SDF I", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS111", name: "SDF Lab I", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH111", name: "Physics I", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH171", name: "Physics Lab I", icon: "beaker", credits: 1, isLab: true },
            { code: "24B11EC111", name: "Basic Electronics", icon: "cpu", credits: 4, isLab: false },
            { code: "24B15EC111", name: "Basic Electronics Lab", icon: "cable", credits: 1, isLab: true },
            { code: "15B11MA111", name: "Mathematics I", icon: "function-square", credits: 4, isLab: false },
            { code: "18B15GE111", name: "Engineering Drawing & Design", icon: "ruler", credits: 1.5, isLab: true },
            { code: "15B11HS112", name: "English", icon: "book-text", credits: 2, isLab: true }
        ],
        "2": [
            { code: "15B11CI211", name: "SDF II", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS121", name: "SDF Lab II", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH211", name: "Physics II", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH271", name: "Physics Lab II", icon: "beaker", credits: 1, isLab: true },
            { code: "15B11MA211", name: "Mathematics II", icon: "function-square", credits: 4, isLab: false },
            { code: "24B11HS111", name: "Universal Human Values (UHV)", icon: "handshake", credits: 3, isLab: true },
            { code: "18B15GE112", name: "Workshop", icon: "ruler", credits: 1.5, isLab: true },
            { code: "24B16HS111", name: "Life Skills & Prof. Comm. Lab (LSPC)", icon: "book-text", credits: 0, isLab: true }
        ],
        "3": [
            { code: "15B11HS211", name: "Economics", icon: "square-sigma", credits: 3 },
            { code: "15B11CI311", name: "Data Structures", icon: "square-code", credits: 4 },
            { code: "15B17CI371", name: "Data Structures Lab", icon: "laptop-minimal", credits: 1, isLab: true },
            { code: "24B11CS213", name: "Database Management Systems", icon: "database", credits: 3 },
            { code: "24B15CS213", name: "Database Management Systems Lab", icon: "computer", credits: 1, isLab: true },
            { code: "25B11MA213", name: "Mathematical Foundations for AI and Data Science", icon: "function-square", credits: 4 }
        ]
    },
    MnC: {
        "1": [
            { code: "15B11CI111", name: "SDF I", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS111", name: "SDF Lab I", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH111", name: "Physics I", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH171", name: "Physics Lab I", icon: "beaker", credits: 1, isLab: true },
            { code: "24B11EC111", name: "Basic Electronics", icon: "cpu", credits: 4, isLab: false },
            { code: "24B15EC111", name: "Basic Electronics Lab", icon: "cable", credits: 1, isLab: true },
            { code: "15B11MA111", name: "Mathematics I", icon: "function-square", credits: 4, isLab: false },
            { code: "18B15GE111", name: "Engineering Drawing & Design", icon: "ruler", credits: 1.5, isLab: true },
            { code: "15B11HS112", name: "English", icon: "book-text", credits: 2, isLab: true }
        ],
        "2": [
            { code: "15B11CI211", name: "SDF II", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS121", name: "SDF Lab II", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH211", name: "Physics II", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH271", name: "Physics Lab II", icon: "beaker", credits: 1, isLab: true },
            { code: "15B11MA211", name: "Mathematics II", icon: "function-square", credits: 4, isLab: false },
            { code: "24B11HS111", name: "Universal Human Values (UHV)", icon: "handshake", credits: 3, isLab: true },
            { code: "18B15GE112", name: "Workshop", icon: "ruler", credits: 1.5, isLab: true },
            { code: "24B16HS111", name: "Life Skills & Prof. Comm. Lab (LSPC)", icon: "book-text", credits: 0, isLab: true }
        ],
        "3": [
            { code: "15B11HS211", name: "Economics", icon: "square-sigma", credits: 3 },
            { code: "15B11CI311", name: "Data Structures", icon: "square-code", credits: 4 },
            { code: "15B17CI371", name: "Data Structures Lab", icon: "laptop-minimal", credits: 1, isLab: true },
            { code: "24B15CS215", name: "Object Oriented Programming using Java", icon: "code-2", credits: 1, isLab: true }
        ]
    },
    RnAI: {
        "1": [
            { code: "15B11CI111", name: "SDF I", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS111", name: "SDF Lab I", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH111", name: "Physics I", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH171", name: "Physics Lab I", icon: "beaker", credits: 1, isLab: true },
            { code: "24B11EC111", name: "Basic Electronics", icon: "cpu", credits: 4, isLab: false },
            { code: "24B15EC111", name: "Basic Electronics Lab", icon: "cable", credits: 1, isLab: true },
            { code: "15B11MA111", name: "Mathematics I", icon: "function-square", credits: 4, isLab: false },
            { code: "18B15GE111", name: "Engineering Drawing & Design", icon: "ruler", credits: 1.5, isLab: true },
            { code: "15B11HS112", name: "English", icon: "book-text", credits: 2, isLab: true }
        ],
        "2": [
            { code: "15B11CI211", name: "SDF II", icon: "laptop", credits: 4, isLab: false },
            { code: "24B15CS121", name: "SDF Lab II", icon: "database", credits: 1, isLab: true },
            { code: "15B11PH211", name: "Physics II", icon: "atom", credits: 4, isLab: false },
            { code: "15B17PH271", name: "Physics Lab II", icon: "beaker", credits: 1, isLab: true },
            { code: "15B11MA211", name: "Mathematics II", icon: "function-square", credits: 4, isLab: false },
            { code: "24B11HS111", name: "Universal Human Values (UHV)", icon: "handshake", credits: 3, isLab: true },
            { code: "18B15GE112", name: "Workshop", icon: "ruler", credits: 1.5, isLab: true },
            { code: "24B16HS111", name: "Life Skills & Prof. Comm. Lab (LSPC)", icon: "book-text", credits: 0, isLab: true }
        ]
    }
};

const materialMap = {
    // sem 1
    "15B11CI111": {
        courseDesc: "https://drive.google.com/file/d/1RDW9m10anKUkq9GJaF6qhZoc_XmgldEa/view?usp=sharing",

        lectures: [
            { title: "Lecture 1", url: "https://drive.google.com/file/d/1baPhZ21gW3ca4-A0EyErIYK4EnmjPLG3/view?usp=sharing" },
            { title: "Lecture 2", url: "https://drive.google.com/file/d/1-4bJz8BU6adrxgESQSBpUvS3tP97DOfu/view?usp=sharing" },
            { title: "Lecture 3", url: "https://drive.google.com/file/d/1xtHT6Zw2DclrniI7rBuoO06MYPgqzCBS/view?usp=sharing" },
            { title: "Lecture 4", url: "https://drive.google.com/file/d/1i7cVCqXlP7l-mITBe8Ufsu9kwF4Ya1hn/view?usp=sharing" },
            { title: "Lecture 5", url: "https://drive.google.com/file/d/1EJiSxassG_Ud_ZEHMBgtnU4YFRbLarMr/view?usp=sharing" },
            { title: "Lecture 6", url: "https://drive.google.com/file/d/15z7Rcji3Av_60FmupZupGKioBwor4yRB/view?usp=sharing" },
            { title: "Lecture 7", url: "https://drive.google.com/file/d/1nxXrh2niJf9duVLbc0o1hA5eIBK97-mk/view?usp=sharing" },
            { title: "Lectures 8-11", url: "https://drive.google.com/file/d/1UyiVfWq_W4YRRPFUmYuLoyFs5xCM9Y5L/view?usp=sharing" },
            { title: "Lectures 12-14", url: "https://drive.google.com/file/d/1Y96jyMgkfdQzXU6GceEQh_l2tCBF7gKL/view?usp=sharing" },
            { title: "Lectures 15-21", url: "https://drive.google.com/file/d/1_RA-EeBBlUTxgV0Qc9k8ULNI3yuXq_Dk/view?usp=sharing" },
            { title: "Lectures 22-23", url: "https://drive.google.com/file/d/1k5rHjCi2usYtHk2VthkEsXtFr_qPQRKs/view?usp=sharing" },
            { title: "Lecture 24", url: "https://drive.google.com/file/d/1p4tKdVaAzhDZ_AHl4XBZEapR2nVmzf09/view?usp=sharing" },
            { title: "Lectures 25-26", url: "https://drive.google.com/file/d/1KzU-qI-X6X4Ac-1nqO_wYao3khy_BiTo/view?usp=sharing" },
            { title: "Lectures 27-28", url: "https://drive.google.com/file/d/1d_ogG3b6CUuH8hxYqVjXPXWMNwP1xhsL/view?usp=sharing" },
            { title: "Lectures 29-30", url: "https://drive.google.com/file/d/1XAxyWYn02pURoLm5mH_4TUFbk5RjASRQ/view?usp=sharing" },
            { title: "Lectures 31-35", url: "https://drive.google.com/file/d/1HF88FTM70S1bOl4fI6nFQJVz8ZKwjQVv/view?usp=sharing" },
            { title: "Lecture 36", url: "https://drive.google.com/file/d/1EQukTJfmUAViaJzhghSUANOM4Vi-AMCF/view?usp=sharing" },
            { title: "Lectures 37-40", url: "https://drive.google.com/file/d/1fkYEmw3JL7IB9INajHtnCZDrGb1b4K-8/view?usp=sharing" },
            { title: "Lectures 41-42", url: "https://drive.google.com/file/d/1WENNVyno75wBBxLxaPlYpoUlEmpUYFTQ/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial Sheet 1", url: "https://drive.google.com/file/d/1sCd2Ni6bs6zqUr6oEX6ua1Sej-uqOecd/view?usp=sharing" },
            { title: "Solution 1", url: "https://docs.google.com/document/d/1rdKX8Wzc_mRUChHm79yxiFmBImhq_0Dy/edit?usp=sharing" },

            { title: "Tutorial Sheet 2", url: "https://docs.google.com/document/d/1-3gajA8TxK0zGHHwcu2LyZVS-Pf8A0Ep/edit?usp=sharing" },
            { title: "Solution 2", url: "https://docs.google.com/document/d/1TkpSPCzT7r3kpyJP-dEfO-7OiGXud3Wd/edit?usp=sharing" },

            { title: "Tutorial Sheet 3", url: "https://docs.google.com/document/d/1MUXbj3DBZ4nAPNUWyF6-vzEMwXN-k5QT/edit?usp=sharing" },

            { title: "Tutorial Sheets 4 & 5", url: "https://drive.google.com/file/d/1rVeOsbEID7KYPeU_2hv8_aF40DNyni_x/view?usp=sharing" },
            { title: "Solutions 4 & 5", url: "https://docs.google.com/document/d/1iCbFmQViaTy9Xadakx980RXnACPlKstA/edit?usp=sharing" },

            { title: "Tutorial Sheets 6 & 7", url: "https://docs.google.com/document/d/1_tt5r8ccHyCJyC8glPjyXm5hv4xK29aC/edit?usp=sharing" },
            { title: "Solutions 6 & 7", url: "https://docs.google.com/document/d/1oUwI9negcGqaWAn_22g73MDsGDgeYKlw/edit?usp=sharing" },

            { title: "Tutorial Sheet 8", url: "https://drive.google.com/file/d/12MLVwCrs_lGbGzc8v14DCDX6Dj4ui0XX/view?usp=sharing" },
            { title: "Solution 8", url: "https://drive.google.com/file/d/1DZAM-AgI6-tovDID23yh9M69DqpRgnxi/view?usp=sharing" },

            { title: "Tutorial Sheet 9", url: "https://drive.google.com/file/d/1GDAaNawxivtn4TKZ9xLfSALDyhARTh-g/view?usp=sharing" },
            { title: "Solution 9", url: "https://docs.google.com/document/d/1M8lzq_DuT1Tr9HssV1upAN68ThI3iZ0u/edit?usp=sharing" },

            // Skipping 10

            { title: "Tutorial Sheet 11", url: "https://drive.google.com/file/d/1uDSKidcTdbc7M3RFsDBkYBba67NvZHPg/view?usp=sharing" },
            { title: "Solution 11", url: "https://docs.google.com/document/d/1g_sD6glI5cy4JBXng_gzVQ37mraFVYj2/edit?usp=sharing" },

            { title: "Tutorial Sheet 12", url: "https://drive.google.com/file/d/1iaIQM9pz91Ita20VgDnwZGbRpJKZQWF7/view?usp=sharing" },
            { title: "Solution 12", url: "https://docs.google.com/document/d/1T2WXf0kDkI0BzLbMJ5BDC6TYWll7BoNz/edit?usp=sharing" },

            { title: "Tutorial Sheet 13", url: "https://docs.google.com/document/d/194LFK6uUpG3-xbBcbVihcibzNhJIvWAd/edit?usp=sharing" },
            { title: "Solution 13", url: "https://docs.google.com/document/d/1Tyj7kXF5obthdWXHogVXNKJl8fjcxpgr/edit?usp=sharing" },
            { title: "Tutorial Sheet 14", url: "https://docs.google.com/document/d/1U2gcuD483HseoBaf-OYV62kvmDosjI4z/edit?usp=sharing" },
            { title: "Solution 14", url: "https://docs.google.com/document/d/1Rh6c8mLnfbdZ2Y3MdRSTmrrn3EqrwsyT/edit?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2023", url: "https://drive.google.com/file/d/1jng9L-CkRfw5X166C_BmrByNKqMWY690/view?usp=sharing" },
            { title: "T1 2024", url: "https://drive.google.com/file/d/1mka3eNr4_ni974_3oNtkn1Pcn6qqNDte/view?usp=sharing" },
            { title: "T2 2023", url: "https://drive.google.com/file/d/1rl-6aiFiTlk5Wo_Q0DjGS3eWTpthShLZ/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1BD5pO2aFDkGx1I_MZcj-7YIF3vz7mPXT/view?usp=sharing" },
            { title: "T3 2023", url: "https://drive.google.com/file/d/1mKfTqH8d1uwnCOq52Y-oGOylt6ni_YOt/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/1E-R6c6Iw3XmaPJdEu3jkOqb04scXx5S_/view?usp=sharing" }

        ],

        youtube: [
            { title: "Apna College", url: "https://www.youtube.com/@ApnaCollegeOfficial", logo: "https://yt3.googleusercontent.com/FEcjRtez5od8UowDo6tTt9WlE-MrIFEmcwPMTORmK9Swk6KCklOmA3xfIG9WuLWfNYfNThQE=s160-c-k-c0x00ffffff-no-rj" },
            { title: "College Wallah", url: "https://www.youtube.com/@CollegeWallahbyPW", logo: "https://yt3.googleusercontent.com/b7X5taC9A8ivQ50vZE8hUC0PuxvlrZlq5bvJAWjOpNr7P_Ffc-V0KHLuCGNPlGWsfWgqs4v1-A=s160-c-k-c0x00ffffff-no-rj" },
            { title: "CodeWithHarry", url: "https://www.youtube.com/@CodeWithHarry", logo: "https://yt3.googleusercontent.com/ytc/AIdro_kX3sdbuu3KFmRPsmlu0R5Rx_BhpxwupjtvJmkEdNfla7w=s160-c-k-c0x00ffffff-no-rj" }
        ],

        books: [
            { title: "Let Us C – Yashavant P. Kanetkar", url: "https://drive.google.com/file/d/1vAeTmxHVC26C-Oju4-0Ci9lFoLzG9WSv/view?usp=sharing" }
        ]
    },
    "15B11PH111": {
        courseDesc: "https://drive.google.com/file/d/18Sc3t9oDrrmcml5NYmCo_HraQtEx27tP/view?usp=sharing",

        lectures: [
            { title: "Lecture 1", url: "https://drive.google.com/file/d/1Ngk-rr1AmypIDv655T12BbTRFW7nX_Tx/view?usp=sharing" },
            { title: "Lecture 2", url: "https://drive.google.com/file/d/162KC10hWPhOHfv6uUx5qT7YhWLq_XTde/view?usp=sharing" },
            { title: "Lecture 3", url: "https://drive.google.com/file/d/1t83IpEDd4fv-kQkmlxdaI1IYxGGNesll/view?usp=sharing" },
            { title: "Lecture 4", url: "https://drive.google.com/file/d/1UmolCt0rai4zf5J3PLslUuxTtIgvSHQM/view?usp=sharing" },
            { title: "Lecture 5", url: "https://drive.google.com/file/d/1n_Se4Jk1VU0mDoRYR63vF9ZACrplqrch/view?usp=sharing" },
            { title: "Lecture 6", url: "https://drive.google.com/file/d/1n4HTu0NIUWYO8sn7e6ryNZR3iFe_4DSd/view?usp=sharing" },
            { title: "Lecture 7", url: "https://drive.google.com/file/d/1LEt-8_JBSLVcfIO53OTJkiy6Cywt7XYz/view?usp=sharing" },
            { title: "Lecture 8", url: "https://drive.google.com/file/d/1pV8uDV-XvnUdgHaqFOgppO82FDT-1z9h/view?usp=sharing" },
            { title: "Lecture 9", url: "https://drive.google.com/file/d/1SwtdTSIVDvkgEesyQbNKlVcscXEbeQdC/view?usp=sharing" },
            { title: "Lecture 10", url: "https://drive.google.com/file/d/1A0UMRVnjFG00QvC_EHb69nQIzOijsdyy/view?usp=sharing" },
            { title: "Lecture 11", url: "https://drive.google.com/file/d/1Ip420iLDZR24BoRk4nMwjqHioj0SUvgW/view?usp=sharing" },
            { title: "Lecture 12", url: "https://drive.google.com/file/d/1PYbIubWZOMhJPjlLUVzj2NuZOODxJsw5/view?usp=sharing" },
            { title: "Lecture 13", url: "https://drive.google.com/file/d/1S671sMoyCT4d3D7p8B65NE6cdMI9SgOc/view?usp=sharing" },
            { title: "Lecture 14", url: "https://drive.google.com/file/d/1JI4zfFkQa8XJASFxliHgoY69BJwnjXpc/view?usp=sharing" },
            { title: "Lecture 15", url: "https://drive.google.com/file/d/1u-zxeJm0Rdm43oe07ehTj8xRJO5TcbjH/view?usp=sharing" },
            { title: "Lecture 16", url: "https://drive.google.com/file/d/1WSg4gdbe-kP4NFZtGTIH_dyBqkLXcXTT/view?usp=sharing" },
            { title: "Lecture 17-18", url: "https://drive.google.com/file/d/1Tt7hvG44UAnX3kPUqXcqg6uE7aAGwYzc/view?usp=sharing" },
            { title: "Lecture 19-20", url: "https://drive.google.com/file/d/1djPGU6-uzfsBA6uFRFFVNPPPrJ-3s-nR/view?usp=sharing" },
            { title: "Lecture 21", url: "https://drive.google.com/file/d/1F8c1PtoUp-KI29rGJT6WsJae4L30lDaF/view?usp=sharing" },
            { title: "Lecture 22", url: "https://drive.google.com/file/d/1o0jDWKXrq1vdecO0NHsxSKXFldtsaYMK/view?usp=sharing" },
            { title: "Lecture 23", url: "https://drive.google.com/file/d/1oKwGLrBnTFPf1Cg5CB5qGQNzqEIaFHaI/view?usp=sharing" },
            { title: "Lecture 24", url: "https://drive.google.com/file/d/1LYF0Tve5rvGr243Q9V72ccmJTTSA2tW2/view?usp=sharing" },
            { title: "Lecture 25-26", url: "https://drive.google.com/file/d/1kkkGrphgawzAiA-42ipPXi_M4XuhuMUb/view?usp=sharing" },
            { title: "Lecture 27", url: "https://drive.google.com/file/d/1d2zPPJ3xUiqg8BfvzFndcKEiNkbBIeHc/view?usp=sharing" },
            { title: "Lecture 28", url: "https://drive.google.com/file/d/1tfEsLB8FOn3E4SXNQL4CTuxCGKY95ism/view?usp=sharing" },
            { title: "Lecture 28.1", url: "https://drive.google.com/file/d/1xGc8uPsDVfWg16czBUROgKeHNUzRaZHX/view?usp=sharing" },
            { title: "Lecture 30", url: "https://drive.google.com/file/d/15aUoC7-cwjL96YMn-OlpzzxpXuD-kmPb/view?usp=sharing" },
            { title: "Lecture 31-32", url: "https://drive.google.com/file/d/1ugXVt7T_ZJcdljNibOEDuAiafxMGJ-wG/view?usp=sharing" },
            { title: "Lecture 33-36", url: "https://drive.google.com/file/d/1p68rhxg0SPuQ-YHCGGvOqkYJraFJJ4-m/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 – Questions", url: "https://drive.google.com/file/d/1kKTArwGs6n3995BuELSwQiq5NGWjqpMb/view?usp=sharing" },
            { title: "Tutorial 1 – Solutions", url: "https://drive.google.com/file/d/16L9PYVyWMtfphRsdRSFlgHdoXj3l62ft/view?usp=sharing" },
            { title: "Tutorial 2 – Questions", url: "https://drive.google.com/file/d/1EQtUbWFKyoFvhJs8EC-_GDRMvZG3_cQ0/view?usp=sharing" },
            { title: "Tutorial 2 – Solutions", url: "https://drive.google.com/file/d/1H3yTv7UjJnqCjv18-9VQgfG772qEcqKo/view?usp=sharing" },
            { title: "Tutorial 3 – Questions", url: "https://drive.google.com/file/d/1a_7PRQCB426gPIe1UBSVsP7w-diwEvyK/view?usp=sharing" },
            { title: "Tutorial 3 – Solutions", url: "https://drive.google.com/file/d/1kZ79GW03yDm7n1ib0DWe8WaUjxtupuLZ/view?usp=sharing" },
            { title: "Tutorial 4 – Questions", url: "https://drive.google.com/file/d/1k-DNv_rfJxpfitt_TM_jTAeCJEqvcHx5/view?usp=sharing" },
            { title: "Tutorial 4 – Solutions", url: "https://drive.google.com/file/d/1s49urpm7WJGcsXmAiKi-1Dn7f6NWL9el/view?usp=sharing" },
            { title: "Tutorial 5 – Questions", url: "https://drive.google.com/file/d/1stD6AWh8pVy1JvM5M8z84561IUID8znN/view?usp=sharing" },
            { title: "Tutorial 5 – Solutions", url: "https://drive.google.com/file/d/1n8_USP3i3kWtiYlU22OABOhdQtVohPKf/view?usp=sharing" },
            { title: "Tutorial 6 – Questions", url: "https://drive.google.com/file/d/1S3s3Zz1nC9qii3t5ZYWC3N464tNMV_Ox/view?usp=sharing" },
            { title: "Tutorial 6 – Solutions", url: "https://drive.google.com/file/d/1r0mtIPTI37my_TDwgKPy949TsvWmUERS/view?usp=sharing" },
            { title: "Tutorial 7 – Questions", url: "https://drive.google.com/file/d/1WT215AGE4cZHOc3DSbcOlWlAHKjGCiib/view?usp=sharing" },
            { title: "Tutorial 7 – Solutions", url: "https://drive.google.com/file/d/1oWGyYxy2zB7IEXyqqoWwOzfFTTJ90Mt9/view?usp=sharing" },
            { title: "Tutorial 8 – Questions", url: "https://drive.google.com/file/d/1Ma9CUZm0hvVBz7XG-cZea48FO4S58n1T/view?usp=sharing" },
            { title: "Tutorial 8 – Solutions", url: "https://drive.google.com/file/d/1BUUscL_naNziAbr3tF4PldPfBrLcVqdj/view?usp=sharing" },
            { title: "Tutorial 9 – Questions", url: "https://drive.google.com/file/d/115eCJiO4DpziM-JCCCY9sMDhQJHjQ_y1/view?usp=sharing" },
            { title: "Tutorial 9 – Solutions", url: "https://drive.google.com/file/d/1eJVrKkiSBIQ3E6Q0DoNZbgdx11pL2Jbg/view?usp=sharing" },
            { title: "Tutorial 10 – Questions", url: "https://drive.google.com/file/d/1HnyX2jzU9ZQIp4f9KybJd7VSKxU374SQ/view?usp=sharing" },
            { title: "Tutorial 10 – Solutions", url: "https://drive.google.com/file/d/108xPO7v5LL5Gc7hKcKsCCspohz34fB0P/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2023", url: "https://drive.google.com/file/d/1R6MV0cgf-g6VTZ_HL7xQ4xHqO80ebGCU/view?usp=sharing" },
            { title: "T1 2024", url: "https://drive.google.com/file/d/1l0samg5rdqHAw5Lcb3Zs2WhmXgwysdfo/view?usp=sharing" },
            { title: "T2 2023", url: "https://drive.google.com/file/d/1NJoaCbwDIhZWoHIaXskAuH8hsTP2IO98/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/11A_CxzSMFih_y-fHoVw_HpyNj-u56gmW/view?usp=sharing" },
            { title: "T3 2023", url: "https://drive.google.com/file/d/1SMLpTGqVlKMmY6ndw0GzcAFNPTLwHJuH/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/1mJyz-EpnCLuJcn3VR-MJzxMffFNuyJNF/view?usp=sharing" }

        ],

        youtube: [
            { title: "Eduphile", url: "https://www.youtube.com/@Eduphile", logo: "https://yt3.googleusercontent.com/ytc/AIdro_kZBvI3DkhCCYII_QAOruOERNOwDWIqXk2WAblc6KuZRQ=s160-c-k-c0x00ffffff-no-rj" },
            { title: "Pankaj Physics Gulati", url: "https://www.youtube.com/@pankajphysicsgulati", logo: "https://yt3.googleusercontent.com/ytc/AIdro_mWGLtz--dAvtJmX8OyjmaWOyWR0or_DXISG0Ckc-8LCMs=s160-c-k-c0x00ffffff-no-rj" }
        ],

        books: [
            { title: "Concepts of Modern Physics – A. Beiser", url: "https://drive.google.com/file/d/1KvH_O4LRa1-ZbQGl6gIMwrQuXwiGmSSK/view?usp=sharing" },
            { title: "Optics – Ajoy Ghatak", url: "https://drive.google.com/file/d/1WtLmew_gHf_cLJLRkS9f9C_I6IuTX9el/view?usp=sharing" }
        ]
    },
    "24B11EC111": {
        courseDesc: "https://drive.google.com/file/d/16J35e8al_tlHk8S-NyXBTNIjFvmz5rha/view?usp=sharing",

        lectures: [
            { title: "Lecture 1", url: "https://docs.google.com/presentation/d/1R08_AdFBASuUdINS5nstc7VI60FceISP/edit?usp=sharing" },
            { title: "Lecture 2", url: "https://docs.google.com/presentation/d/1u7tKkJzOvCtYKvgFYyCeKLVeADHVOF5B/edit?usp=sharing" },
            { title: "Lecture 3", url: "https://docs.google.com/presentation/d/1Dz3X-VoWEgyrmdauQe82jBe_xA6UGncA/edit?usp=sharing" },
            { title: "Lecture 4", url: "https://docs.google.com/presentation/d/1Qiuy9k1jiz8N4dsD9UqJICgMUwJTQlDk/edit?usp=sharing" },
            { title: "Lecture 5", url: "https://docs.google.com/presentation/d/1SgpUpDO4rAXDXZBLgyU0KK1coIaYMt7d/edit?usp=sharing" },
            { title: "Lecture 6", url: "https://docs.google.com/presentation/d/1h3iXE3abQ-96m5v5bhmmcihyAxQWiMmK/edit?usp=sharing" },
            { title: "Lecture 7", url: "https://docs.google.com/presentation/d/16blnC0GgvsJOzch1FGLPYfrhSER33jjD/edit?usp=sharing" },
            { title: "Lecture 8", url: "https://docs.google.com/presentation/d/1VRmctJrT_YxT0eIVJze8HDeb5By97Yhw/edit?usp=sharing" },
            { title: "Lecture 9", url: "https://docs.google.com/presentation/d/1LeA96XHwKP3RAvBbUz-X4AUPIcrVbyyC/edit?usp=sharing" },
            { title: "Lecture 10", url: "https://docs.google.com/presentation/d/1A_sokZ6KiQsvj0s4lcIDRfWMhiapUDk8/edit?usp=sharing" },
            { title: "Unit 2", url: "https://docs.google.com/presentation/d/1AswL5vWVSb-CI-0HCo033PAUswn7Cef8/edit?usp=sharing" },
            { title: "Unit 3", url: "https://docs.google.com/presentation/d/1_gcjhU4s-xFe2P8Ur6Wvj74QImO2iOey/edit?usp=sharing" },
            { title: "Unit 4", url: "https://docs.google.com/presentation/d/1bFF-pzuE06J_HujLQe_aZ-HtYmMw3Okl/edit?usp=sharing" },
            { title: "Unit 5", url: "https://docs.google.com/presentation/d/1NIl0P7Y9vBJBtH6CZSWH3EgS_Uxf1k4n/edit?usp=sharing" },
            { title: "Unit 6", url: "https://docs.google.com/presentation/d/15bNKvAsCcEkdFUrGcMdj0pNXg_lfQTKk/edit?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 – Questions", url: "https://drive.google.com/file/d/1FSul0LlcjUQ-rA5Vi3s7T8Syv3CjGUaJ/view?usp=sharing" },
            { title: "Tutorial 1 – Solutions", url: "https://drive.google.com/file/d/1IjZkiNYIMPwlpPYJnDhFH8kvE5e280PK/view?usp=sharing" },
            { title: "Tutorial 2 – Questions", url: "https://drive.google.com/file/d/1z1lnB88gsHatyi0Zih5qOcd8ykpw0GF-/view?usp=sharing" },
            { title: "Tutorial 2 – Solutions", url: "https://drive.google.com/file/d/1_U7Sb5HiMznLsSEeQkEUVfwwq4yfLFXD/view?usp=sharing" },
            { title: "Tutorial 3 – Questions", url: "https://drive.google.com/file/d/1MCAfDTKZ2jtPTFaM3djkq_eDLEwogMfD/view?usp=sharing" },
            { title: "Tutorial 3 – Solutions", url: "https://drive.google.com/file/d/1NmMQ1kAnF53-A1IWvPi9zJlT31WTDQQY/view?usp=sharing" },
            { title: "Tutorial 4 – Questions", url: "https://drive.google.com/file/d/1OL56YQ07P-7uBEhS-hqUEctce4gZCRuD/view?usp=sharing" },
            { title: "Tutorial 4 – Solutions", url: "https://drive.google.com/file/d/15u11weBH3tTv0RkwV60mU89rDLdO6nSB/view?usp=sharing" },
            { title: "Tutorial 5 – Questions", url: "https://drive.google.com/file/d/1FEfKcor0IzqsUaeb7d8X_UWpYxa5yLFa/view?usp=sharing" },
            { title: "Tutorial 5 – Solutions", url: "https://drive.google.com/file/d/13IOVImz1PQufhvtcyKzAi9wr-uaVFGh4/view?usp=sharing" },
            { title: "Tutorial 6 – Questions", url: "https://drive.google.com/file/d/1bNNxY1RdeVjd1SosWIV0fNpL9RSAZ9od/view?usp=sharing" },
            { title: "Tutorial 6 – Solutions", url: "https://drive.google.com/file/d/19rGJ8dNYjBP22_hsOId974rVZnlUU_yx/view?usp=sharing" },
            { title: "Tutorial 7 – Questions", url: "https://drive.google.com/file/d/10kfYcTO3tpFWnu3WpKWMBd_Uy_UCcLSN/view?usp=sharing" },
            { title: "Tutorial 7 – Solutions", url: "https://drive.google.com/file/d/1LuYZdg0p5bZyCQ2pTONI5ika0TieNe2K/view?usp=sharing" },
            { title: "Tutorial 8 – Questions", url: "https://drive.google.com/file/d/1y5mX9IRP6iq8AkgCmv2_M66R6gwCkCiM/view?usp=sharing" },
            { title: "Tutorial 8 – Solutions", url: "https://drive.google.com/file/d/1NAJxSiRD0Lyig-b5sTGUSuQ-l2V9K_nm/view?usp=sharing" },
            { title: "Tutorial 9 – Questions", url: "https://drive.google.com/file/d/1QH2Puu2VJ4zzfdASdCoJo0AlqC2S2FnS/view?usp=sharing" },
            { title: "Tutorial 9 – Solutions", url: "https://drive.google.com/file/d/1kHKD7wizo8aj1ZYU6ZgQIDHmEPm9PTB5/view?usp=sharing" },
            { title: "Tutorial 10 – Questions", url: "https://drive.google.com/file/d/1jnNbQ4-1DFutaTTQ2DZ2_Hfvwz7ZpzcV/view?usp=sharing" },
            { title: "Tutorial 10 – Solutions", url: "https://drive.google.com/file/d/1WSFHjZYl5ud8g9ABfFbKA55YEFOJKB2N/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2024", url: "https://drive.google.com/file/d/1CANbOr03wqJX6Ov26qzwbBnFXBwvlUR4/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1l-GX7Dao4wrywTFnk2T6L0IeZHNSMHFp/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/1vBTbqVutTmecvcoCqK02hqT8wdT-XVg-/view?usp=sharing" }
        ],

        youtube: [
            { title: "Perfect Computer Engineer", url: "https://www.youtube.com/@perfectcomputerengineer", logo: "https://yt3.googleusercontent.com/ytc/AIdro_mxDKqnkjgRZf95WnSoe8qV8PACjsklmBCdyuHQMoPJZnI=s160-c-k-c0x00ffffff-no-rj" },
            { title: "Electrical Engineering Academy", url: "https://www.youtube.com/@ElectricalEngineeringAcademy", logo: "https://yt3.googleusercontent.com/6Fu01tyGZN0ier-8MgjLPb9fXHINn6PQ6xtFecnuV4E39WOgMuiBlRdIDIYuhgnY0sGQVqrQaA=s160-c-k-c0x00ffffff-no-rj" },
            { title: "Gautam Varde", url: "https://www.youtube.com/@gautamvarde", logo: "https://yt3.googleusercontent.com/VPdwphwDvFga4_naIXOjmQSMhONww1Ym6goquJitOBay-LZua2jSAMWC-guPZgU2kz2TZgS4gQ=s160-c-k-c0x00ffffff-no-rj" }
        ],

        books: [
            { title: "Introduction to Electric Circuits", url: "https://drive.google.com/file/d/1lxJZRiES2n8nLzusCpDrTjPjT6Cx6Qz5/view?usp=sharing" }
        ]
    },
    "15B11MA111": {
        courseDesc: "https://drive.google.com/file/d/12k65QiWDcIQQQoFsgVdz2AE3W-YLS9jH/view?usp=sharing",

        lectures: [
            { title: "Lectures 32–40 (Matrices)", url: "https://drive.google.com/file/d/1jA9lPuzXOSlP_Eof3aIjZ5bGLwup0JHW/view?usp=sharing" },
            { title: "Lecture 2", url: "https://drive.google.com/file/d/1oavQir6COAviqZrV6juRshQY9urKc-Lp/view?usp=sharing" },
            { title: "Lecture 3", url: "https://drive.google.com/file/d/1f4rpuBvtwJFi-2EcV2Ei5rdpoYPEN4vn/view?usp=sharing" },
            { title: "Lecture 4", url: "https://drive.google.com/file/d/1EfWKkuOHISzNY2oLg82U16Sr-i9g_0DI/view?usp=sharing" },
            { title: "Lecture 5", url: "https://drive.google.com/file/d/1wSPFcl2DSFFLJEXOFRA4MU2aS9TB95_E/view?usp=sharing" },
            { title: "Lecture 6", url: "https://drive.google.com/file/d/1PMO-Fw09iRltiyWeqaheOTK5mWo6US2i/view?usp=sharing" },
            { title: "Lecture 7", url: "https://drive.google.com/file/d/1vrKJH-08Yv6QVuiKV8NcIEXkdbWj4eIn/view?usp=sharing" },
            { title: "Lecture 8", url: "https://drive.google.com/file/d/1OsP50yEjUq0xL8Hb5Ulp5JsDYgSHYSs0/view?usp=sharing" },
            { title: "Lecture 9", url: "https://drive.google.com/file/d/1rUrGnSqc1Tt4of3h7OEPL0njS-NBC5vr/view?usp=sharing" },
            { title: "Lecture 10", url: "https://drive.google.com/file/d/1b2yz53GdlaN-f-p0YPQ7qBufFGOJles5/view?usp=sharing" },
            { title: "Lecture 11", url: "https://drive.google.com/file/d/1HHxZ_HFNWR6Pg3UL3lgqA8L0HhmbV67o/view?usp=sharing" },
            { title: "Lecture 12", url: "https://drive.google.com/file/d/1FYj1FvRj87SmyJ3uhYTIAnad69qD-Jen/view?usp=sharing" },
            { title: "Lecture 13", url: "https://drive.google.com/file/d/1iZTwusgmmUWeC9YRu6rPG3cQoVwpGCW8/view?usp=sharing" },
            { title: "Lecture 14", url: "https://drive.google.com/file/d/1aC3WAyLXvpgiwxpuhD9P1G5DZ40E5AD2/view?usp=sharing" },
            { title: "Lecture 15", url: "https://drive.google.com/file/d/19Pd2QB5gCJYpmfprysLR33l-abLk9B2R/view?usp=sharing" },
            { title: "Lecture 16", url: "https://drive.google.com/file/d/1EWh1NkyCsKQ5M_BUuqCei7Beul_nZk9k/view?usp=sharing" },
            { title: "Lecture 17", url: "https://drive.google.com/file/d/1COK1UqTSnjoUbDY2FNhPBkJemz5XuTF4/view?usp=sharing" },
            { title: "Lecture 18", url: "https://drive.google.com/file/d/1ZsRQqS1X0KORsU6yBI10pICLe4kjxCIH/view?usp=sharing" },
            { title: "Lecture 19", url: "https://drive.google.com/file/d/1KuK_xDeG0m5jKSD-2IqEXgOFKV7gLKWh/view?usp=sharing" },
            { title: "Lecture 20", url: "https://drive.google.com/file/d/1vumOTRzIKSeSoQQ29GD3jm4-62Sb9LRz/view?usp=sharing" },
            { title: "Lecture 21", url: "https://drive.google.com/file/d/1uThStSfy1Y0-yhpiYrpmmayqneQE5JHx/view?usp=sharing" },
            { title: "Lecture 22", url: "https://drive.google.com/file/d/1SFCmBgPG6mcl68XYSZBKemHZpWv1T3K9/view?usp=sharing" },
            { title: "Lecture 23", url: "https://drive.google.com/file/d/1KjCil3qn5qtyrQLzWgZyKvJjDK7HYv4K/view?usp=sharing" },
            { title: "Lecture 24", url: "https://drive.google.com/file/d/1Bu3wu9PHrn2vxzunxvm248q4Jc4R7giG/view?usp=sharing" },
            { title: "Lecture 25", url: "https://drive.google.com/file/d/1pXDh3PQzDy4quHU7RJQm9kvGrbfPl4g5/view?usp=sharing" },
            { title: "Lecture 26", url: "https://drive.google.com/file/d/1J5H_z-lxHtGwybH0H1O8Xp9T0GcvnHQc/view?usp=sharing" },
            { title: "Lecture 27", url: "https://drive.google.com/file/d/1ixrO69HLs-dPG2Lw1ON6HXt5rbg4QtrP/view?usp=sharing" },
            { title: "Lecture 28", url: "https://drive.google.com/file/d/19y8WDA3j0ITEjF2R8zFPthIhrE7u1tPz/view?usp=sharing" },
            { title: "Lecture 29", url: "https://drive.google.com/file/d/1keXC_4S1bE8FwOtPOUMu8pZYMFdbFa_O/view?usp=sharing" },
            { title: "Lecture 30", url: "https://drive.google.com/file/d/1eYZVfsUrhe-ybLgoyAXmwYVLm5HHmJuy/view?usp=sharing" },
            { title: "Lecture 31", url: "https://drive.google.com/file/d/1Lw2ttKDrPR41kSzSyUSc9OQIlWmtasdB/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 – Questions", url: "https://drive.google.com/file/d/1JNznoTz1E_yPyc0SsbHSyuF9bTdq09Gw/view?usp=sharing" },
            { title: "Tutorial 2 – Questions", url: "https://drive.google.com/file/d/193OOClwz9NqknbbIa-68-aOVtEnvS3hu/view?usp=sharing" },
            { title: "Tutorial 3 – Questions", url: "https://drive.google.com/file/d/1XFgpnuAs01yv9yNm8x70exTkc67A8H9b/view?usp=sharing" },
            { title: "Tutorial 4 – Questions", url: "https://drive.google.com/file/d/1Aceeoqw0Ammj1gFWWGj8iqawcfNNZZDY/view?usp=sharing" },
            { title: "Tutorial 5 – Questions", url: "https://drive.google.com/file/d/1CBG9GybKfhzVL_vKXpJHMsQxQGA4vViD/view?usp=sharing" },
            { title: "Tutorial 5 – Solutions", url: "https://drive.google.com/file/d/1Pft9bgM4t8BqzbBLs2sf6KrZ3e-inwFo/view?usp=sharing" },
            { title: "Tutorial 6 – Questions", url: "https://drive.google.com/file/d/1SEXhHTeZc76Id7yTSJ8puWuvx5gyDXBY/view?usp=sharing" },
            { title: "Tutorial 7 – Questions", url: "https://drive.google.com/file/d/1c2zZe0zt4upmvm7FSDCBVEvlFKfJUX3R/view?usp=sharing" },
            { title: "Tutorial 8 – Questions", url: "https://drive.google.com/file/d/1MBLSzP2T3oGvTI6YynqR-JNE0zdUOYX1/view?usp=sharing" },
            { title: "Tutorial 8 – Solutions", url: "https://drive.google.com/file/d/1z-2cSxrK0THtt2i4Nyjq-KWpItDpq80m/view?usp=sharing" },
            { title: "Tutorial 9 – Questions", url: "https://drive.google.com/file/d/11Tt0YKK4Lj6vU20-Zg_l4pSWJqLoLmTA/view?usp=sharing" },
            { title: "Tutorial 10 – Questions", url: "https://drive.google.com/file/d/12lJQqyS9wvUcFQQAg4OCrLa9608KZlMj/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2023", url: "https://drive.google.com/file/d/1gM8wZI0YoGAu0UOKbCH5XtRMaxEoNjRQ/view?usp=sharing" },
            { title: "T1 2024", url: "https://drive.google.com/file/d/1W3rZc7t1zM6m6ZdlOYR4njAbf5XnpesP/view?usp=sharing" },
            { title: "T2 2023", url: "https://drive.google.com/file/d/1TY4YlI7hxiGH3CqaML0EEoGucrfBwhzl/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1FwlfweSRb6sib-X8nPslQI-C849C3blg/view?usp=sharing" },
            { title: "T3 2023", url: "https://drive.google.com/file/d/1NU4IJELPzj4R-giPLXl49hUQ35HpnGXN/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/12zLog1EzvU-dU2VYw4_COWLZmcpnXIpW/view?usp=sharing" },
            { title: "T1, T2, T3 2022", url: "https://drive.google.com/file/d/1h8kyyvOeXb9V9R4HIVHiDSieIbzZcibU/view?usp=sharing" }
        ],

        youtube: [
            { title: "Pradeep Giri Academy", url: "https://www.youtube.com/@pradeepgiriacademy", logo: "https://yt3.googleusercontent.com/vIs7il8BNpy_a_Rfw-xjALXtMc58cFXfpMv5o7PioaLOdAs0la3OHLjqSVOhXViKPYyr4Jb_0A=s160-c-k-c0x00ffffff-no-rj" },
            { title: "Dr. Gajendra Purohit", url: "https://www.youtube.com/@gajendrapurohit", logo: "https://yt3.googleusercontent.com/jZxMN-zI0AolSc4aGHSjkU74KK_4Im2d5RDGHXqw2DbvkMnZ8dLClL0C7nSB7u-EbjJroSFvVek=s160-c-k-c0x00ffffff-no-rj" }
        ],

        books: [
            { title: "Advanced Engineering Mathematics", url: "https://drive.google.com/file/d/1bwIHx0m9chdekBzuy3C8eyavaXowdGzZ/view?usp=sharing" }
        ]
    },
    "24B15CS111": {
        courseDesc: "https://drive.google.com/file/d/1OZYhEge15-i5U9pb2ig7IZFVgbVD-Uli/view?usp=sharing",

        lectures: [
            { title: "List of Experiments", url: "https://drive.google.com/file/d/1gL4shNWm9HamZJEpGidJ15vvjEuHvJ3e/view?usp=sharing" },
            { title: "Lab Manual", url: "https://drive.google.com/file/d/1P6HOoBTF_vgNdoOgCH-MZo3VWZEGzYFa/view?usp=sharing" },
            { title: "Sample Project Synopsis – SDF Lab 1", url: "https://docs.google.com/document/d/1w5kaGo9ZxmHWECFJWO1E-yZzboj4OMNl/edit?usp=sharing&ouid=101014883004128941869&rtpof=true&sd=true" }
        ],

        assignments: [
            { title: "Week 1", url: "https://drive.google.com/file/d/1iPw4CoH8jNE5MTS-JFWIe5clwNnB15fb/view?usp=sharing" },
            { title: "Week 2", url: "https://drive.google.com/file/d/1XvHfa3FxgsfkhEVh4pl7U6dThFITU80g/view?usp=sharing" },
            { title: "Week 3", url: "https://drive.google.com/file/d/1WhemHMDYlT3WAEeuzY7rr-5EX4ogYo6F/view?usp=sharing" },
            { title: "Week 4", url: "https://drive.google.com/file/d/1IeL5TbJHYFyZpvt3DiXwP-Zs75HUiwEi/view?usp=sharing" },
            { title: "Weeks 5 & 6", url: "https://drive.google.com/file/d/11CgsMdOado5rTP38Y8lHXnQ8gN_cvyKR/view?usp=sharing" },
            { title: "Weeks 7 & 8", url: "https://drive.google.com/file/d/1wq3OoEtb1Jpw42QlmHJct-8CYM7J50MF/view?usp=sharing" },
            { title: "Week 9", url: "https://drive.google.com/file/d/1RzFbNtaAKQ2jkmWQSLRyGzOGW7sEwAqN/view?usp=sharing" },
            { title: "Week 10", url: "https://drive.google.com/file/d/1w6DZLyGWTKmTLHwycPzDYgy9e2T2sIH4/view?usp=sharing" },
            { title: "Week 11", url: "https://drive.google.com/file/d/1IZyXZSV2bBLk_g8P6TYAWEu4uMoDczNk/view?usp=sharing" },
            { title: "Week 12", url: "https://drive.google.com/file/d/18PEa7NUpPZuWocn-uI2uFEffkEovJevQ/view?usp=sharing" },
            { title: "Week 13", url: "https://drive.google.com/file/d/1P8RqWe90gJWYf_QTy1XdFHjFe3WtUhzT/view?usp=sharing" },
            { title: "Weeks 14 & 15", url: "https://drive.google.com/file/d/1bSt2mfx0StFYYyAZDeQxfMuQB78hiQ3M/view?usp=sharing" }
        ],

        pyqs: [
            { title: "Eval 1", url: "https://drive.google.com/file/d/1rChfZ0_PP7Nh4ayNuRBGmmF3Jhb67B-y/view?usp=sharing" },
            { title: "Eval 2", url: "https://drive.google.com/file/d/1iAsmCNorG8TTtEBeIa_FPKomdIQ0on-E/view?usp=sharing" },
            { title: "Lab Test 1", url: "https://drive.google.com/file/d/1cXjOKUE1buxLhoPjC0f5SbB1AhEppke3/view?usp=sharing" },
            { title: "Lab Test 2", url: "https://drive.google.com/file/d/14XvNV8ujN9dBxFykiVty5ML8PAOTASXx/view?usp=sharing" }
        ]
    },
    "15B17PH171": {
        courseDesc: "https://drive.google.com/file/d/1tgkxKB1umb6kUh0-nf4XcxJ81ZoDEqcS/view?usp=sharing",

        lectures: [
            { title: "List of Experiments", url: "https://drive.google.com/file/d/15NUqJWde4FI4f2DYGfEKyTeOmSrWQaC1/view?usp=sharing" },
            { title: "Exp. 1 (Newton's Ring)", url: "https://drive.google.com/file/d/16sS0a75jZ4I2Br3ZVwGRzSOtdcbdUCdn/view?usp=sharing" },
            { title: "Exp. 2 (Fresnel Biprism)", url: "https://drive.google.com/file/d/1_rMjUFtm55dDUpG6_PJkr6abcDvt3_fk/view?usp=sharing" },
            { title: "Exp. 3 (Polarimeter)", url: "https://drive.google.com/file/d/1jI_s5c2qMUB6wGOJqYKR7iFJbSZh6XKP/view?usp=sharing" },
            { title: "Exp. 4 (Stefan's Law)", url: "https://drive.google.com/file/d/1h1pn-4rLNW3nIHDjrT03imkqwUhllsMK/view?usp=sharing" },
            { title: "Exp. 5 (Carey Foster's Bridge)", url: "https://drive.google.com/file/d/1PvndO-yqx0J86ZPAT6kWr52YWr8R1DK1/view?usp=sharing" },
            { title: "Exp. 6A (Dispersive Power)", url: "https://drive.google.com/file/d/1JtZw4SrvwHhnYTG4KjVWAProxMXfqubo/view?usp=sharing" },
            { title: "Exp. 6B (Cauchy's Constant)", url: "https://drive.google.com/file/d/1DWnQ54cPxkti93SyjzaEy0IB7ljq9qRe/view?usp=sharing" },
            { title: "Exp. 7 (Diffraction Grating)", url: "https://drive.google.com/file/d/1X2p3r6wokc3sy9iKszvVOpGeec97laUK/view?usp=sharing" },
            { title: "Exp. 8 (Planck's Constant)", url: "https://drive.google.com/file/d/1O8EGd-7blh6JxY0AMU3_SVQ2tcBynmGF/view?usp=sharing" },
            { title: "Exp. 9 (Helmholtz Galvanometer)", url: "https://drive.google.com/file/d/1YOMs_zfF4jrhzBKao6xsOutDoAtozMjL/view?usp=sharing" },
            { title: "Exp. 10 (Planck's Cons. by Solar Cell)", url: "https://drive.google.com/file/d/1-Xyb8zUxw7c5c7SWvkmL1tnxvTgVp4Iz/view?usp=sharing" }
        ],

        assignments: [],
        pyqs: []
    },
    "24B15EC111": {
        courseDesc: "https://drive.google.com/file/d/1tH28Uk_0o1RsrP680lzgg0oVfbMhriLe/view?usp=sharing",

        lectures: [
            { title: "All in one Lab Manual", url: "https://drive.google.com/file/d/17BdnLXjHoc6wYiIzNnsOR-jHUzk9nAG7/view?usp=sharing" }
        ],

        assignments: [],
        pyqs: []
    },
    "18B15GE111": {
        courseDesc: "https://drive.google.com/file/d/1FGQCpniOxUEVuuqntZhdExLvHjSkGvyj/view?usp=sharing",

        lectures: [
            { title: "Module 4 (Engineering Curves)", url: "https://drive.google.com/file/d/1mdmOr97nk01A5etd9_Z9fulrYBEqlEO2/view?usp=sharing" },
            { title: "Module 5 (Theory of Projections)", url: "https://docs.google.com/presentation/d/1_AROwe-XWgL-wJpPxFFVup2okj50Q27W/edit?usp=sharing&ouid=101014883004128941869&rtpof=true&sd=true" },
            { title: "Module 6 (Projection of Points)", url: "https://drive.google.com/file/d/1A5rmzOb6Od4p8-Hn3zUEBMtNoZGxLyiG/view?usp=sharing" },
            { title: "Module 7 (Projection of Straight Lines)", url: "https://drive.google.com/file/d/1D1Z9bLaKJ2YRnIqNf5b1MZop2daOX8nX/view?usp=sharing" },
            { title: "Module 8 (Projection of Planes)", url: "https://drive.google.com/file/d/1MIuHfmO9cKYwbNSn1FuOi1TeDBp0g5Oo/view?usp=sharing" },
            { title: "Module 9 (Projection of Solids)", url: "https://drive.google.com/file/d/1a2R2BrmCqMRukbVtK3f_KDhKO6NS8j4L/view?usp=sharing" },
            { title: "Module 13 (Isometric Projection)", url: "https://drive.google.com/file/d/1gJjwLnRR_vqGdUZfqi0HgtVleHbHMKig/view?usp=sharing" }
        ],

        assignments: [
            { title: "Assignment 1", url: "https://drive.google.com/file/d/1CcWuFSoEYB0iTJ9sz1Sl357aVod8UmSF/view?usp=sharing" },
            { title: "Assignment 2 (Engineering Curves)", url: "https://drive.google.com/file/d/1rVLmhW8Mgm151HpDyEScIvgWYiSB7vs6/view?usp=sharing" },
            { title: "Assignment 3 (Projection of Solids)", url: "https://drive.google.com/file/d/1A402TEWgcP0xtTxd9yeDQn4u88qxWhyi/view?usp=sharing" },
            { title: "2D Drawing Workbook", url: "https://drive.google.com/file/d/1CLHzzf_y1STRTrwiHxpqbXs96FJbdXDH/view?usp=sharing" },
            { title: "Branch Specific Design Ideas", url: "https://drive.google.com/file/d/1c7A02Ix0iX14UNX_7elQJu2ewdZ4XwW4/view?usp=sharing" }
        ],

        pyqs: [
            { title: "Endterm 2023", url: "https://drive.google.com/file/d/1RY8ZOvCszxUZ3q4rfWHMZFYLzhAO7ctJ/view?usp=sharing" },
            { title: "Endterm 2024 (Combined)", url: "https://drive.google.com/file/d/1l3rJdfV3al-EpMrrBkVMn_M9gYhjXThp/view?usp=sharing" },
            { title: "Midterm 2023", url: "https://drive.google.com/file/d/1oYh87MgVMbPFTEsPNJ-dls9F9mGEkvyI/view?usp=sharing" },
            { title: "Midterm 2024 (Combined)", url: "https://drive.google.com/file/d/1Lo308UlEnjXzys5vm6FUkhWcXeL7FEo4/view?usp=sharing" }
        ]
    },
    "15B11HS112": {
        courseDesc: "https://drive.google.com/file/d/1WOxMGvlqPaAWyFB_As969Nr1JbU_0T_M/view?usp=sharing",

        lectures: [
            { title: "Lecture 1", url: "https://drive.google.com/file/d/1ZLf7RtmKDha58nf4IpbyobtkZmdKeDmp/view?usp=sharing" },
            { title: "Lecture 2", url: "https://drive.google.com/file/d/1ouEi1kM5LFNs_VruUjdk4YZAXCbH91fq/view?usp=sharing" },
            { title: "Lecture 3", url: "https://drive.google.com/file/d/1WFswMNRXgdAUA4gYgfi1vcDA_1hRU47N/view?usp=sharing" },
            { title: "Lecture 4", url: "https://drive.google.com/file/d/1EbaEQFtwhz_IBAYItLK3jNnkYTmm4bws/view?usp=sharing" },
            { title: "Lecture 5", url: "https://drive.google.com/file/d/1ePkIMRFB_TcADj6GpdQ73lVAMIY5C7By/view?usp=sharing" },
            { title: "Lecture 6", url: "https://drive.google.com/file/d/19CHmaQO53qVzSXZ9G1SsL03WVygY2hs7/view?usp=sharing" },
            { title: "Lecture 7", url: "https://drive.google.com/file/d/1-w7LPlCz-lZsDw8nN37cYyDIqLSxZvLB/view?usp=sharing" },
            { title: "Lecture 8", url: "https://drive.google.com/file/d/1JSmHULz0lYSlxM6D0vX5I6TRWKQps0mS/view?usp=sharing" },
            { title: "Lecture 9", url: "https://drive.google.com/file/d/1FXAUyFKVrvbnfGDBpnuhmSmuxoyoNCwk/view?usp=sharing" },
            { title: "Lecture 10", url: "https://drive.google.com/file/d/1GVcTJbeRF2l644aJwFRXDdBzI2Lj8KKX/view?usp=sharing" },
            { title: "Lecture 11", url: "https://drive.google.com/file/d/1CfEQC0-WooUwgp6CyqcL4JcT_vY5WUUi/view?usp=sharing" },
            { title: "Lecture 12", url: "https://drive.google.com/file/d/1JJuiAqdTQ69YVmmkl39hJ_8leJuRV0TH/view?usp=sharing" },
            { title: "Lecture 13", url: "https://drive.google.com/file/d/1rBiN6F8oOQqnvlh6fvc-V0bC8YLXmpOL/view?usp=sharing" },
            { title: "Lecture 14", url: "https://drive.google.com/file/d/1WGePEM72V1EecnzbsKkb1o39yR8saSbV/view?usp=sharing" },
            { title: "Literature Text", url: "https://drive.google.com/file/d/1BdnHD9hGwFlodJX1tAzG-ahT6-CpNl3n/view?usp=sharing" }
        ],

        assignments: [
            { title: "Week 1 - Ice Breaking Activities", url: "https://drive.google.com/file/d/1gEuNfMR_j4zBUf6f7sqL0gm6UezFXKkl/view?usp=sharing" },
            { title: "Week 2 - Bingo & Extempore", url: "https://drive.google.com/file/d/16vGQYZ8IGWXktiMd82_Ru4flPN_e3pUQ/view?usp=sharing" },
            { title: "Week 3 - Presentation", url: "https://drive.google.com/file/d/1wFJXadHVTpZnUD1taVJkpqmbMjMthXOZ/view?usp=sharing" },
            { title: "Week 6 - Practical on Phonetics", url: "https://drive.google.com/file/d/1ju89aLGCqz-Gn3M501ijQfy9n9N7rCbP/view?usp=sharing" },
            { title: "Week 7", url: "https://drive.google.com/file/d/1ly8EVL8ntO96AaS0uS2hvPJ1TMUV6i_2/view?usp=sharing" },
            { title: "Week 10 - Grammar & Rhetoric Activity", url: "https://drive.google.com/file/d/1CthH1ytgGX_0tVutcZoBzWKdLZQTL9qR/view?usp=sharing" },
            { title: "Week 12", url: "https://drive.google.com/file/d/1lTKuhDB_eubfQ-Wdcq1iCIfKPKvGoJFp/view?usp=sharing" },
            { title: "Week 13-14", url: "https://drive.google.com/file/d/1jGJOf39rS31m1BqFSM4YY-9vgARoYvRe/view?usp=sharing" }
        ],

        pyqs: [
            { title: "Endterm 2024", url: "https://drive.google.com/file/d/1hAhG1-ZbVngUQ0IR-qvrDm3Epk9hjSxw/view?usp=sharing" },
            { title: "Endterm 2023", url: "https://drive.google.com/file/d/105Pyirkoifp-U0BxDYnFZG_O3bvPozxb/view?usp=sharing" },
            { title: "Endterm 2021", url: "https://drive.google.com/file/d/1PJEBWwa8ZWxpkkTH0KIiOLQwcKFTwWFu/view?usp=sharing" }
        ]
    },
    // sem 3
    "15B11HS211": {
        courseDesc: "https://drive.google.com/file/d/15a6casKtoEL3MTb1GZ3OX0erb6aD-r4d/view?usp=sharing",

        lectures: [
            { title: "Lecture 1 - Introduction", url: "https://drive.google.com/file/d/1ekauTMyy0gMEEyTErFVoXw24M5zzXUAh/view?usp=sharing" },
            { title: "Lecture 2 - DD-SS", url: "https://drive.google.com/file/d/1Eu63S6afH0juLvDoOgHYKMAhSYQ2371N/view?usp=sharing" },
            { title: "Lecture 3 - Market Demand and Market Equilibrium", url: "https://drive.google.com/file/d/1nS1o11t9CqdCfOHdlo1rMrj8GnQz470X/view?usp=sharing" },
            { title: "Lecture 4 - Elasticity", url: "https://drive.google.com/file/d/1bUuNNdHHdjLtvd6rQ9UpdV_gXYQKrj5D/view?usp=sharing" },
            { title: "Lecture 5 - Consumer Choice", url: "https://drive.google.com/file/d/1Yy0GhcvSplCJQ6GgtYP1TLlQXutuPFwJ/view?usp=sharing" },
            { title: "Lecture 6 - Regression Analysis I", url: "https://drive.google.com/file/d/1eVfxI7H1Rt4G689XjNI-brwWu4z9wEqa/view?usp=sharing" },
            { title: "Lecture 7 - Demand Forecasting & Time Series", url: "https://drive.google.com/file/d/1uDsSeiFn1p7sdeRXfgC06kFbB-dBPCKl/view?usp=sharing" },
            { title: "Lecture 8 - Regression Analysis II", url: "https://drive.google.com/file/d/1eqbRSE7aJoa2vxY9M0bO6O5k33W2SG9B/view?usp=sharing" },
            { title: "Lecture 9 - COST", url: "https://drive.google.com/file/d/1MUwUJzVwaKZhCTHIF5mjyZmjjtNSY8tK/view?usp=sharing" },
            { title: "Lecture 9 - Production 2020", url: "https://drive.google.com/file/d/1R2UnJRWOIuRiMBjCQU8tP6PCekUknEZa/view?usp=sharing" },
            { title: "Lecture 10 - Market Structure & Perfect Competition", url: "https://drive.google.com/file/d/1Sw4JKhiu4XLk6Q9vK-46nEMFDfSZFCNr/view?usp=sharing" },
            { title: "Lecture 11 - Monopoly", url: "https://drive.google.com/file/d/19ibT-9L6UxCeWleiIVbG-vQgu_3B28ox/view?usp=sharing" },
            { title: "Lecture 12 - Monopolistic Competition Market", url: "https://drive.google.com/file/d/1wVH-e7c5-KwxQO2XJkx5mf6Xs45EtM3d/view?usp=sharing" },
            { title: "Lecture 13 - Oligopoly", url: "https://drive.google.com/file/d/1alDSnGB9pQRj4344I8fr9wLCRTORWSgV/view?usp=sharing" },
            { title: "Lecture 15 - Business Cycle", url: "https://drive.google.com/file/d/1Jv9K0oaerZyn-liEGwpVhKqJVzV95RLf/view?usp=sharing" },
            { title: "Lecture 16 - Inflation", url: "https://drive.google.com/file/d/1oXjEMGVHu1jUeMkdZs3-9OIOqYOURL5N/view?usp=sharing" },
            { title: "Lecture - National Income Accounting", url: "https://drive.google.com/file/d/1g8uH2_VymQ5zjysh5q_5qDMQ7G4NTEwE/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 (with solutions)", url: "https://drive.google.com/file/d/1D1tjuUfq-UO6cvEHC0pEnxvBwRc9sp_J/view?usp=sharing" },
            { title: "Tutorial 2 (with solutions)", url: "https://drive.google.com/file/d/1nqDccA2yCpmId3_RnQ7zO5KeKefsDQJ5/view?usp=sharing" },
            { title: "Tutorial 3 (with solutions)", url: "https://drive.google.com/file/d/1E8Zvxp7WXotNvEqIZv_zY924ngMy5ZHv/view?usp=sharing" },
            { title: "Tutorial 4 (with solutions)", url: "https://drive.google.com/file/d/1dq0Jcqh7eqXQgTuFKEbN898SlTCHWRP-/view?usp=sharing" },
            { title: "Tutorial 5 (with solutions)", url: "https://drive.google.com/file/d/1ageBNPkQF5IF7_GtLKKiMAdK5HQuusHV/view?usp=sharing" },
            { title: "Tutorial 6 (with solutions)", url: "https://drive.google.com/file/d/14xr1-pkFrgOXetXLGlNJ7o0gs4u2Qpr2/view?usp=sharing" },
            { title: "Tutorial 7 (with solutions)", url: "https://drive.google.com/file/d/1cR5VRCxQdNu2ErvQ989uoFOxkoB7pXJ-/view?usp=sharing" },
            { title: "Tutorial 8 - Questions", url: "https://docs.google.com/document/d/1eWq-QZ2oMtUaMLhATlOhK2pM4eysyM43/edit?usp=sharing&ouid=101014883004128941869&rtpof=true&sd=true" },
            { title: "Tutorial 8 - Solution", url: "https://drive.google.com/file/d/1t1ctoxLYMHhvKx9RkXtN0Yo96P7VCWeq/view?usp=sharing" },
            { title: "Tutorial 9 - Questions", url: "https://drive.google.com/file/d/1Njyp2BTkQxozrZJrr3jHnonwOsY-8Jsa/view?usp=sharing" },
            { title: "Tutorial 9 - Solution", url: "https://drive.google.com/file/d/16rA2mUhTgiBlTRmHZYVFoktj8Rp73A79/view?usp=sharing" },
            { title: "Tutorial 10 - Questions", url: "https://docs.google.com/document/d/1Snyzl6GXZga7Vn7UCYb3S55Vj6nNSAwB/edit?usp=sharing&ouid=101014883004128941869&rtpof=true&sd=true" },
            { title: "Tutorial 10 - Solution", url: "https://drive.google.com/file/d/1VIelquD39l5Xfqu2HE-gRWlMMXDe-iKL/view?usp=sharing" },
            { title: "Tutorial 11 (with solutions)", url: "https://drive.google.com/file/d/1LDa_b7M2ApMSsrnBWSVuVMzhL9R_b2H3/view?usp=sharing" },
            { title: "Tutorial 12 - Questions", url: "https://docs.google.com/document/d/1lJ0P86Xi-podfs0xHlfCxe7kk62VmRzq/edit?usp=sharing&ouid=101014883004128941869&rtpof=true&sd=true" },
            { title: "Tutorial 12 - Solution", url: "https://drive.google.com/file/d/1RcqtHK0OORua8KYBBj92FlN5rWH9RE6-/view?usp=sharing" },
            { title: "Tutorial 13 - Questions", url: "https://docs.google.com/document/d/1Y0RwUulCMCEmRaa7LMCibzMjYkcRp8Kk/edit?usp=sharing&ouid=101014883004128941869&rtpof=true&sd=true" },
            { title: "Tutorial 13 - Solution", url: "https://drive.google.com/file/d/1uz715KSwqiS2WV8mxo2QG_CPexHiQBNJ/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2024", url: "https://drive.google.com/file/d/1D5mSswYtUGHhQmFtFMCwuvJq17W89XVC/view?usp=sharing" },
            { title: "T1 2022", url: "https://drive.google.com/file/d/1YgNz5DU-tbcGNgL58BggCP-V7wwsvKRf/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/15jPrNxbLh9N5DRLq3V1xdO35nesPKBwm/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/14RcCH0g7xU8m2tUnKcCG7ArjiLUWNZdn/view?usp=sharing" },
            { title: "T3 2022", url: "https://drive.google.com/file/d/1HILPVtJEQ5v2hh2p_eFemWdZxpY7yU9k/view?usp=sharing" },
            { title: "T3 2021", url: "https://drive.google.com/file/d/1Qx5RBbmpcNEZZFuEGRABOl7bUfkxWXaf/view?usp=sharing" }
        ],
        youtube: [],
        books: []
    },
    "15B11CI311": {
        courseDesc: "https://drive.google.com/file/d/1tmWzJEBFHwf53M5ST5xKwF5XlGxFseqa/view?usp=sharing",

        lectures: [
            { title: "Module 1", url: "https://drive.google.com/file/d/1NkkLcqMz0dUv76TJlpYTbj-nwg4U7TsD/view?usp=sharing" },
            { title: "Module 2", url: "https://drive.google.com/file/d/1hOsFqzZNZptl3Yvrq5GqYuFMteQTSNl9/view?usp=sharing" },
            { title: "Module 3", url: "https://drive.google.com/file/d/1s8zylRTmfC2KJ0YyrtnSuvKliasNN4QH/view?usp=sharing" },
            { title: "Module 4", url: "https://drive.google.com/file/d/1wcfKjFv_QbDxJAFg94_CKWn1Z_aoeCI3/view?usp=sharing" },
            { title: "Module 5", url: "https://drive.google.com/file/d/1W6mr1sBWkhTCzAz8rq9WGbSXP6zTN7Ko/view?usp=sharing" },
            { title: "Module 6", url: "https://drive.google.com/file/d/18gsI4ZD6xvOodr6rgzEJ3Do5NbK3mHXj/view?usp=sharing" },
            { title: "kd-Trees", url: "https://drive.google.com/file/d/1_KneStZMLiialuzUHOLOFcxiaONy85zb/view?usp=sharing" }
        ],

        tutorials: [],

        pyqs: [
            { title: "T1 2024", url: "https://drive.google.com/file/d/1a8yJXlbViFXGRTZa7_ZOXtBeX_QOM5ZS/view?usp=sharing" },
            { title: "T1 2021", url: "https://drive.google.com/file/d/1f1ujagepucFEXn2ENjg-YchzcBrFQw08/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1TeOfrELjO_K4iJddqciBbSjGSpbPMopb/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/1MAoZ-Vuu2jhxLhNLqIVZYiQae9UpZrH7/view?usp=sharing" }
        ],

        youtube: [
            {
                title: "Jenny's Lectures CS IT",
                url: "https://www.youtube.com/@JennyslecturesCSIT",
                logo: "https://yt3.googleusercontent.com/G_0IAqOglBkQz1-AFWsxxiRrT7DjPfrQksCMs-I82D6wCOrG1PCa9LjntW9zW5TodRLccBr6ew=s160-c-k-c0x00ffffff-no-rj"
            }
        ],

        books: []
    },
    "15B17CI371": {
        courseDesc: "https://drive.google.com/file/d/1oTce86bfWtTnLEUG6pWSGWn39k8Kmqa8/view?usp=sharing",

        lectures: [
            {
                title: "Lab Manual",
                url: "https://drive.google.com/file/d/103WH69RH-K-PoELa29Y-CigZ152jyy_I/view?usp=sharing"
            }
        ],

        assignments: [
            { title: "Week 0 - A", url: "https://drive.google.com/file/d/1RqtrtTlB5exdhtzu0z2NiPPdVTemtPAx/view?usp=sharing" },
            { title: "Week 0 - B", url: "https://drive.google.com/file/d/1vjrwgAKEC789UcbEDPy06_x3msPxToke/view?usp=sharing" },
            { title: "Week 1 - A", url: "https://drive.google.com/file/d/1N1Jx_X6gEA8Bbi0736bJkoOSfs_LCe9g/view?usp=sharing" },
            { title: "Week 1 - B", url: "https://drive.google.com/file/d/1pyh4SYBzkDdFlMQumQT-RUxoEv31JpMr/view?usp=sharing" },
            { title: "Week 2 - A", url: "https://drive.google.com/file/d/144Xeo25zjaybcbayJIGJWqBgT9OBByi_/view?usp=sharing" },
            { title: "Week 2 - B", url: "https://drive.google.com/file/d/1b70YG14SsxjsKB_pKtroZKyj5B5GRd6B/view?usp=sharing" },
            { title: "Week 3 - A", url: "https://drive.google.com/file/d/10IZGcy9zc0wzWACyG8DxAWQu1f53i0iU/view?usp=sharing" },
            { title: "Week 3 - B", url: "https://drive.google.com/file/d/1DWWRFe6N53u8nIfPBw2dXdnWnBboKaqe/view?usp=sharing" },
            { title: "Week 4 - A", url: "https://drive.google.com/file/d/1TD2gA8HBSbcgwE2Yv36ms8Q6qWf1ajog/view?usp=sharing" },
            { title: "Week 4 - B", url: "https://drive.google.com/file/d/1O3xKCT2E3j8oDX3ZVBUBEMn5wCgVa-2H/view?usp=sharing" },
            { title: "Week 5 - A", url: "https://drive.google.com/file/d/1i5LaBOgfx0tio4JQtVXdjZduRaJkoetP/view?usp=sharing" },
            { title: "Week 5 - B", url: "https://drive.google.com/file/d/1A_qGC_ngIQZKhst5VwPvdW-P9qEkKDpl/view?usp=sharing" },
            { title: "Week 6 - A", url: "https://drive.google.com/file/d/1OmLQ24Qw3hsuay1wA4QcgKTAF0wgR4n2/view?usp=sharing" },
            { title: "Week 6 - B", url: "https://drive.google.com/file/d/1Mek8wU58YVtwj6f_BivTUwOrrf-9F0Uo/view?usp=sharing" },
            { title: "Week 7 - B", url: "https://drive.google.com/file/d/1SZeFy-4Vkw9LLYCmclzcG7RZq00Qkv92/view?usp=sharing" },
            { title: "Week 8 - A", url: "https://drive.google.com/file/d/1r3ORskSfjXDysYcKmwkDOqn_yvfrRF95/view?usp=sharing" },
            { title: "Week 8 - B", url: "https://drive.google.com/file/d/1A-toPdy8rtWQFYWietyk63kNbmdkbJMZ/view?usp=sharing" },
            { title: "Week 9 - A", url: "https://drive.google.com/file/d/1HQ8HNnRNOfGrkK1TdJFklFYVLhvsNn8a/view?usp=sharing" },
            { title: "Week 9 - B", url: "https://drive.google.com/file/d/1g7lLAbkdi8-caO8pGC3m3e9lGUrDj2Y4/view?usp=sharing" },
            { title: "Week 10 - A", url: "https://drive.google.com/file/d/158DIKO7_gqjudIrp_4ByOkL2QRlftRgi/view?usp=sharing" },
            { title: "Week 10 - B", url: "https://drive.google.com/file/d/1czBS3MuU6oRUd_Ie9WSCczbD2rMAel5v/view?usp=sharing" },
            { title: "Week 11 - B", url: "https://drive.google.com/file/d/1sKaDNQ-id3LtMJN_GJLNCUCdRKSHwzSk/view?usp=sharing" },
            { title: "Week 12 - A", url: "https://drive.google.com/file/d/1UEJ13M1wP23U1ZO0wCaCIUMWE4vQ47w1/view?usp=sharing" },
            { title: "Week 12 - B", url: "https://drive.google.com/file/d/13qZ7uYq8b7aY3qbTDh_JVYAQErJhBscI/view?usp=sharing" },
            { title: "Week 13 - A", url: "https://drive.google.com/file/d/1V4ygxGcvKxBKU2f3kfLDlvPVK3CgE66C/view?usp=sharing" },
            { title: "Week 13 - B", url: "https://drive.google.com/file/d/1_MfUHe8bA7z6CYPs8pWfY6waCgiOtSif/view?usp=sharing" },
            { title: "Week 14 - A", url: "https://drive.google.com/file/d/17AnCkErc1-jV_RI4IHifRtb6hUwKHkZv/view?usp=sharing" }
        ],

        pyqs: [
            { title: "Eval1 - Paper 1", url: "https://drive.google.com/file/d/1d-GVWsXmeEj5GSJ-KU6jZVYMoJbJS43m/view?usp=sharing" },
            { title: "Eval1 - Paper 2", url: "https://drive.google.com/file/d/1qYz4aN9l1MmVwf-i1xv0abtYwX1nvmNT/view?usp=sharing" },
            { title: "Eval2 - Paper 1", url: "https://drive.google.com/file/d/1K75eqZoU7zGyqqrbr8AZpPPR8qfQTVQ5/view?usp=sharing" },
            { title: "Eval2 - Paper 2", url: "https://drive.google.com/file/d/1-Sp6TcdnkdhE6QcrENccp12WxKbo39d7/view?usp=sharing" },
            { title: "Labtest1 - Paper 1", url: "https://drive.google.com/file/d/1BafGBHIWs3u5D5lyFdTNaVt-r113K2Xz/view?usp=sharing" },
            { title: "Labtest1 - Paper 2", url: "https://drive.google.com/file/d/1-2vXxcRJX6hztWPtYQv165wXJRZJWjib/view?usp=sharing" },
            { title: "Labtest2 - Paper 1", url: "https://drive.google.com/file/d/1Fc95Xw1UtWg-8pntGCnE-0XR4wXYmE3P/view?usp=sharing" },
            { title: "Labtest2 - Paper 2", url: "https://drive.google.com/file/d/1QrxT2PmB0LQ-GvPdp8TtSKGPJLd4we3X/view?usp=sharing" }
        ]
    },
    // sem 2
    "15B11CI211": {
        courseDesc: "https://drive.google.com/file/d/1vHXUUsicIMrhSXki4Uoctp7P8NKNOTgx/view?usp=sharing",

        lectures: [
            { title: "Lecture 1", url: "https://drive.google.com/file/d/1hP0ke0ZeZ2QXyHXFOsKZ2fOW3GsrmP7q/view?usp=sharing" },
            { title: "Lecture 2", url: "https://drive.google.com/file/d/1MfJjTwObDw0DC1wgtg1xClM7peuNpmCZ/view?usp=sharing" },
            { title: "Lecture 3", url: "https://drive.google.com/file/d/1WklA1yt9jzXjWJa-OxBrcRYTbfSZBO7-/view?usp=sharing" },
            { title: "Lecture 4", url: "https://drive.google.com/file/d/1_EaGkSGEDPFRtRJ6bggrUTTRnMOfUdNf/view?usp=sharing" },
            { title: "Lecture 5", url: "https://drive.google.com/file/d/1-rRdtXfjbTSBIwfnd5ij9eMGj-zlZG4i/view?usp=sharing" },
            { title: "Lecture 6", url: "https://drive.google.com/file/d/14wv3R4ywxY2jBPAls4-2hfC-RLQuaNs3/view?usp=sharing" },
            { title: "Lecture 7", url: "https://drive.google.com/file/d/1XDU-VyFTEZDfe-ZnVB2KkO5MSg0hiAO3/view?usp=sharing" },
            { title: "Lecture 8", url: "https://drive.google.com/file/d/1Brfnqwa7Tzhl8mRMtpeWt7cWfatA1Tc6/view?usp=sharing" },
            { title: "Lecture 9", url: "https://drive.google.com/file/d/1hYl1P5u_4_FUzAWEeIXpEIl3q-XlJq2p/view?usp=sharing" },
            { title: "Lecture 10–11", url: "https://drive.google.com/file/d/1gdePFQXsDU1k3LPU9HBnwWs_NmvpQQSU/view?usp=sharing" },
            { title: "Lecture 11A", url: "https://drive.google.com/file/d/1WjT8PKoo-vmlJdm8-bFjdqIF81h_gbYf/view?usp=sharing" },
            { title: "Lecture 12–13", url: "https://drive.google.com/file/d/1yfpfQKD2ZmNgUbaKmNJxSn2qrIcmNmz8/view?usp=sharing" },
            { title: "Lecture 14", url: "https://drive.google.com/file/d/1_uz4BSOgrztCVLjyhY0IHR6ATC4zbJnR/view?usp=sharing" },
            { title: "Lecture 15–16", url: "https://drive.google.com/file/d/1RKj9PJ4LuYGtst9aYtOInJaaFDj56Dsq/view?usp=sharing" },
            { title: "Lecture 17", url: "https://drive.google.com/file/d/1F1aw66wVLN872EcqIdJe7AOMU9vy6fRx/view?usp=sharing" },
            { title: "Lecture 18–19", url: "https://drive.google.com/file/d/1vd3wPFDv3AbrnoBhPkPNTJirSdgiW5eD/view?usp=sharing" },
            { title: "Lecture 20–21", url: "https://drive.google.com/file/d/1AQRrqURvaDQTh-X0gIpp6il6Z9lMNgYQ/view?usp=sharing" },
            { title: "Lecture 22–24", url: "https://drive.google.com/file/d/13IqkgtpIO01mmYeEvQ14FmtzMJGmniE2/view?usp=sharing" },
            { title: "Lecture 25–27", url: "https://drive.google.com/file/d/1728uP4C7mo3U0KHicSb23Jho11hr3Nzj/view?usp=sharing" },
            { title: "Lecture 28–30", url: "https://drive.google.com/file/d/1KEwciNEWsB4SnL7Q7egcRFLifC4QZXxS/view?usp=sharing" },
            { title: "Lecture 31–32", url: "https://drive.google.com/file/d/1QLuN7NDIqRM7ZUqwSr2ZRrN_yULXGEBi/view?usp=sharing" },
            { title: "Lecture 33–34", url: "https://drive.google.com/file/d/16I8ef8jSfTmI1g_4iwBJkO-HidCJ1jAY/view?usp=sharing" },
            { title: "Lecture 35", url: "https://drive.google.com/file/d/18RdkuCGJYYXvEG47CKq-BloAnPULBdLk/view?usp=sharing" },
            { title: "Lecture 36", url: "https://drive.google.com/file/d/1Gid48RqQafo2SF5awiWCKHx1sHDIYuSp/view?usp=sharing" },
            { title: "Lecture 37–38", url: "https://drive.google.com/file/d/1VI94bRG0UQU9N6rvd83g6NZb0lVvCA-i/view?usp=sharing" },
            { title: "Lecture 39–40", url: "https://drive.google.com/file/d/1HRFP4MmWCIk6Jw1zoI5WC3y9GwDnDBn2/view?usp=sharing" },
            { title: "Lecture 41–42", url: "https://drive.google.com/file/d/19OqkGZO6ULbkFBLt3mCFjNy_N4lESm_L/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 (with solutions)", url: "https://drive.google.com/file/d/13J_3rJjxZXgR_tOV43mlE0y6yuganbEm/view?usp=sharing" },
            { title: "Tutorial 2 (with solutions)", url: "https://drive.google.com/file/d/1U55d4RZfX1C8yMQ0uXEme5ZQp4Uf61vW/view?usp=sharing" },
            { title: "Tutorial 3 (with solutions)", url: "https://drive.google.com/file/d/1PjTRrc568Mqwcqq5UBnlKm19YtmB_Qk5/view?usp=sharing" },
            { title: "Tutorial 4 (with solutions)", url: "https://drive.google.com/file/d/1Ms0qpKv3TU2q5uAFupAfgmthq1S5-Fxi/view?usp=sharing" },
            { title: "Tutorial 5 (with solutions)", url: "https://drive.google.com/file/d/1x5PYrkPg51VQU-qsGKE8NFSrDIEsVaYk/view?usp=sharing" },
            { title: "Tutorial 6 (with solutions)", url: "https://drive.google.com/file/d/1XFfavIhzy_yFriaZocaXT4tsjJp2aAtq/view?usp=sharing" },
            { title: "Tutorial 7 (with solutions)", url: "https://drive.google.com/file/d/16CMANXgBBCldsLslFjXWgnMmVrh_eDYV/view?usp=sharing" },
            { title: "Tutorial 8 (with solutions)", url: "https://drive.google.com/file/d/1uvyyK5ouYV1GBOpa3RjqUTGrywE2gufU/view?usp=sharing" },
            { title: "Tutorial 9 (with solutions)", url: "https://drive.google.com/file/d/1T05jwc7x0RLrXIl5E2W2lztMYwl8Nd_S/view?usp=sharing" },
            { title: "Tutorial 10 (with solutions)", url: "https://drive.google.com/file/d/1cYOSB20lm5IGw9E5fBTNVbXlTtO3xkaK/view?usp=sharing" },
            { title: "Tutorial 11", url: "https://drive.google.com/file/d/1m_nDTC6G7Mgbky3RZrBAJNVuB7YH_Lx3/view?usp=sharing" },
            { title: "Tutorial 12", url: "https://drive.google.com/file/d/156BvDE2x5uq7B4_Pn0Uc1MO6F9InyvMw/view?usp=sharing" },
            { title: "Tutorial 13", url: "https://drive.google.com/file/d/1HvRIug1P6kEchnz_eexf8gSxHa-PKImJ/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2025", url: "https://drive.google.com/file/d/1dMigqw30eCVfaDagXBhgR6ip48dsmRwW/view?usp=sharing" },
            { title: "T1 2024", url: "https://drive.google.com/file/d/1_jjMId8pmfxIMmr-_KEnA7-M6GkXAvu_/view?usp=sharing" },
            { title: "T2 2025", url: "https://drive.google.com/file/d/1NLgg8WeVTU5iNBybCnbZ20a5BDO5f80K/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1cXfBYec1eXxQKSKdbLhevtobdY-M2MJA/view?usp=sharing" },
            { title: "T2 2023", url: "https://drive.google.com/file/d/1vexpRIkGw1ivUPpkyxJRjSBGh7Zmfbxa/view?usp=sharing" },
            { title: "T2 2022", url: "https://drive.google.com/file/d/1zfOx1OmwS9GGDB1xB_ZHWe-6pes-1FdE/view?usp=sharing" },
            { title: "T3 2025", url: "https://drive.google.com/file/d/1AaYytDtTm9htlS2A7wpMlvfMrCGuhTfG/view?usp=sharing" }
        ],

        youtube: [
            { title: "Apna College", url: "https://www.youtube.com/@ApnaCollegeOfficial", logo: "https://yt3.googleusercontent.com/FEcjRtez5od8UowDo6tTt9WlE-MrIFEmcwPMTORmK9Swk6KCklOmA3xfIG9WuLWfNYfNThQE=s160-c-k-c0x00ffffff-no-rj" },
            { title: "take U forward", url: "https://www.youtube.com/@takeUforward", logo: "https://yt3.googleusercontent.com/ytc/AIdro_mdPFTT7VuJHQkvzW9gjJxvSV3bBDpEVNw8dWOmHjTT5g=s160-c-k-c0x00ffffff-no-rj" }
        ],

        books: [
            { title: "C++: The Complete Reference", url: "https://drive.google.com/file/d/10VMY7k3DSwxpSy98uT7GpWeEQh1OvEBo/view?usp=sharing" },
            { title: "Object-Oriented Programming in C++", url: "https://drive.google.com/file/d/1C2BC4a589wV4g6ZNPcDjzQ1kzqx6qkuc/view?usp=sharing" }
        ]
    },
    "15B11MA211": {
        courseDesc: "https://drive.google.com/file/d/1utYgq_Ewviiq5QDDun20jjqJsEyIzjm_/view?usp=sharing",

        lectures: [
            { title: "Lectures 2–11", url: "https://drive.google.com/file/d/1shc669PL2m7ZFkT9_3wfbf5VSO9IeFm4/view?usp=sharing" },
            { title: "Lectures 12–21", url: "https://drive.google.com/file/d/1w572IP3jhfY_jwBnw_1j_Tb0MS1-lWoM/view?usp=sharing" },
            { title: "Lectures 22–42", url: "https://drive.google.com/file/d/1_oKUGqW1vnJY95UAm56F4Tyn44Ho0qYm/view?usp=sharing" },
            { title: "Notes (All Modules)", url: "https://drive.google.com/file/d/1eLziPr4TaaJZ_xUWBxtIuebNoKTAfKyO/view?usp=sharing" },
            { title: "Short Notes (All Modules)", url: "https://drive.google.com/file/d/1Hjz42jzwjJJhXtR67X9rXLDr_XecmWKF/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 (with solutions)", url: "https://drive.google.com/file/d/1oEvnaaKwdfoTE-PrwtIt3k8C_TZ5pp0J/view?usp=sharing" },
            { title: "Tutorial 2 (with solutions)", url: "https://drive.google.com/file/d/1Or2m4amgu5XYrKGLYfVBXXZWu6qhx0By/view?usp=sharing" },
            { title: "Tutorial 3 (with solutions)", url: "https://drive.google.com/file/d/1X3HU2hqQLWLcMFo4w4CG8hLRvgF1dEd9/view?usp=sharing" },
            { title: "Tutorial 4 (with solutions)", url: "https://drive.google.com/file/d/1Xvi3UBgREUlHBYW9dMu_8NH9grVFCam1/view?usp=sharing" },
            { title: "Tutorial 5 (with solutions)", url: "https://drive.google.com/file/d/1VPpPns9uHU0stA3UzvshcZfMyItMpiW0/view?usp=sharing" },
            { title: "Tutorial 6 (with solutions)", url: "https://drive.google.com/file/d/1zibEDAFWEhzpHqKrK2N41RAk1s1qOEKi/view?usp=sharing" },
            { title: "Tutorial 7 (with solutions)", url: "https://drive.google.com/file/d/16gc12lymFB6zYGd15m1KiqEFvETqxOFK/view?usp=sharing" },
            { title: "Tutorial 8 (with solutions)", url: "https://drive.google.com/file/d/1OFG51FtyB4s2qOFnnKCZ6MSVVxUxqSpj/view?usp=sharing" },
            { title: "Tutorial 9 (with solutions)", url: "https://drive.google.com/file/d/18-hxq4gn7_w1MDj1O8xRJzn0rteus7HY/view?usp=sharing" },
            { title: "Tutorial 10 (with solutions)", url: "https://drive.google.com/file/d/1vSHCjK2lLny9pMO6rPNh1LAkJKibEGCQ/view?usp=sharing" },
            { title: "Tutorial 11 (with solutions)", url: "https://drive.google.com/file/d/1DJdX4qY3eP6ttTNEzEBxq96FHOwIlKMd/view?usp=sharing" },
            { title: "Tutorial 12 (with solutions)", url: "https://drive.google.com/file/d/1s-Sj6hQNkMxQ9tlsG37GKsVWmWgkPZg0/view?usp=sharing" },
            { title: "Tutorial 13 (with solutions)", url: "https://drive.google.com/file/d/1HjP4gc7zHDT-W3Ul-I360gdzlJMgFW5c/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2024", url: "https://drive.google.com/file/d/1Z4JSCYyAE1-UIy0ZG2f7hMtLxBKDNUy6/view?usp=sharing" },
            { title: "T1 2025", url: "https://drive.google.com/file/d/1ZEV4o-CYrMH6MfLMiAV3suWUo1H3CXZl/view?usp=sharing" },
            { title: "T2 2022", url: "https://drive.google.com/file/d/15GJvP3M5yRSKMKdbv2QLVHg0001VZczt/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1D2LRZWv-t23mIwS--zMhOWYMebHZ7o3D/view?usp=sharing" },
            { title: "T2 2025", url: "https://drive.google.com/file/d/1ZZUrD5ulx40qYvNovcR8t3rApgeo4GIY/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/1GxFU_0Pid_w1JgT-c3dTOknGKfTfQX8y/view?usp=sharing" },
            { title: "T3 2025", url: "https://drive.google.com/file/d/14dMN3Yn0DczwV3wMOVhbbnPtc2vaC8_a/view?usp=sharing" }
        ],

        youtube: [
            {
                title: "FEARLESS INNOCENT MATH",
                url: "https://www.youtube.com/@dr.anuj.fearlessinnocentmath",
                logo: "https://yt3.googleusercontent.com/E3C3HDdEXQnc5obzT_Seqq8NA_8q5lM4N_jydzSsQXbFZywkt5MGEPZLKuR4TdQuRuyTS2DO9A=s160-c-k-c0x00ffffff-no-rj"
            },
            {
                title: "Pradeep Giri Academy",
                url: "https://www.youtube.com/@pradeepgiriacademy",
                logo: "https://yt3.googleusercontent.com/vIs7il8BNpy_a_Rfw-xjALXtMc58cFXfpMv5o7PioaLOdAs0la3OHLjqSVOhXViKPYyr4Jb_0A=s160-c-k-c0x00ffffff-no-rj"
            },
            {
                title: "Dr.Gajendra Purohit",
                url: "https://www.youtube.com/@gajendrapurohit",
                logo: "https://yt3.googleusercontent.com/jZxMN-zI0AolSc4aGHSjkU74KK_4Im2d5RDGHXqw2DbvkMnZ8dLClL0C7nSB7u-EbjJroSFvVek=s160-c-k-c0x00ffffff-no-rj"
            },
            {
                title: "Gautam Varde",
                url: "https://www.youtube.com/@gautamvarde",
                logo: "https://yt3.googleusercontent.com/VPdwphwDvFga4_naIXOjmQSMhONww1Ym6goquJitOBay-LZua2jSAMWC-guPZgU2kz2TZgS4gQ=s160-c-k-c0x00ffffff-no-rj"
            },
            {
                title: "MathCom Mentors",
                url: "https://www.youtube.com/@MathComMentors",
                logo: "https://yt3.googleusercontent.com/HjhhHqZcVQRJufD_P6zuWb1bYkd0iTHCsJ_kmW7UPZMDdeObIsae7i48N4zmFYnVOQts-2HtLA=s160-c-k-c0x00ffffff-no-rj"
            }
        ],

        books: [
            {
                title: "Higher Engineering Mathematics – B. V. Ramana",
                url: "https://drive.google.com/file/d/17M16JffvBTQ0E716ntol23l74SeMApjw/view?usp=sharing"
            }
        ]
    },
    "15B11PH211": {
        courseDesc: "https://drive.google.com/file/d/1tDfpL_r6bd0EUCFQx7Y8xB4Y8FgaHihL/view?usp=sharing",

        lectures: [
            { title: "Module 1 – Electromagnetism", url: "https://drive.google.com/file/d/14KrokfrLzXIAGMkDXuQJLglm0KaOymDF/view?usp=sharing" },
            { title: "Module 2 – Lasers, Optical Fiber", url: "https://drive.google.com/file/d/1BVq0TP99L2xBwG8jUgjpTXn8kiStV0ND/view?usp=sharing" },
            { title: "Module 3 – Solid State Physics", url: "https://drive.google.com/file/d/1Bayl9sspoZt39f7IRuaTF9AWru2vmG-K/view?usp=sharing" },
            { title: "FEL_Semiconductor_Hall Effect", url: "https://drive.google.com/file/d/1aixdYEm7F-v4NMZ44RCZEbcwez9dxheK/view?usp=sharing" },
            { title: "Short Notes (All Modules)", url: "https://drive.google.com/file/d/101_NTgNdYd4ekDlA27OhIRS-P2-f1Upf/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Tutorial 1 (with solutions)", url: "https://drive.google.com/file/d/12Ag8LkB9Zt5_FDOOUvvkhtk4TVzOp3x9/view?usp=sharing" },
            { title: "Tutorial 2 (with solutions)", url: "https://drive.google.com/file/d/1QkdtvUdzuFYvfYFv3sDPMq7eNNXroESE/view?usp=sharing" },
            { title: "Tutorial 3 (with solutions)", url: "https://drive.google.com/file/d/15cv_vqxeqtn8yowRArXK_7tD3N1m9i_R/view?usp=sharing" },
            { title: "Tutorial 4 (with solutions)", url: "https://drive.google.com/file/d/1LxTN_Y2kzBEirwwKHPPByJw3ud9C1P4f/view?usp=sharing" },
            { title: "Tutorial 5 (with solutions)", url: "https://drive.google.com/file/d/1nWiqI8frUtHPyiOacuc7y5JI9Ov-Gu3Z/view?usp=sharing" },
            { title: "Tutorial 6 (with solutions)", url: "https://drive.google.com/file/d/1TscgdhiXZ9I8XPkFW5IxGxXqJip9oiMg/view?usp=sharing" },
            { title: "Tutorial 7 (with solutions)", url: "https://drive.google.com/file/d/1T5c6QtB-JlU1C_NibCSwE9qiMC-BYAlp/view?usp=sharing" },
            { title: "Tutorial 8 (with solutions)", url: "https://drive.google.com/file/d/10Dng9yUZkE4rFIR6MY2Uj6082lXU7Bhq/view?usp=sharing" },
            { title: "Tutorial 9 – Questions", url: "https://drive.google.com/file/d/12BKAC_OMCLpHhFGjMrfnuIUTFVdYg4rL/view?usp=sharing" },
            { title: "Tutorial 9 – Solutions", url: "https://drive.google.com/file/d/1MlSNEfZq4BZ7mJOaGlEdjvyNodnHWHEI/view?usp=sharing" },
            { title: "Tutorial 10 – Questions", url: "https://drive.google.com/file/d/17AqMF_lhxR4HtGQjrXUr1OHctpoQMtcd/view?usp=sharing" },
            { title: "Tutorial 10 – Solutions", url: "https://drive.google.com/file/d/1fo-n1h89DLsg6-GTRXt_Gkx_N1Qjxta2/view?usp=sharing" },
            { title: "Tutorial 11 – Questions", url: "https://drive.google.com/file/d/1xgKPhM8ao13_CVn0_0RqUl75EoIzFpoF/view?usp=sharing" }
        ],

        pyqs: [
            { title: "T1 2024", url: "https://drive.google.com/file/d/177WZyp33in8nYIEeei8AKfz9yre0jSeZ/view?usp=sharing" },
            { title: "T1 2025", url: "https://drive.google.com/file/d/19Adz8KFKlO7dMYrJCeXQKBX8aeliWKml/view?usp=sharing" },
            { title: "T2 2022", url: "https://drive.google.com/file/d/1b1QqbNPUZ9YoAw4IKBZq-MffWCne-T8C/view?usp=sharing" },
            { title: "T2 2024", url: "https://drive.google.com/file/d/1qWdTfxwerjigtagZCVpdwMwTQavAioIE/view?usp=sharing" },
            { title: "T2 2025", url: "https://drive.google.com/file/d/1BkqSkLVcouk4TEYAjQ25cVay9MWqkqi6/view?usp=sharing" },
            { title: "T3 2024", url: "https://drive.google.com/file/d/1PtCLn-tXK3HpdhwfmbJZzJfjmxLatpJU/view?usp=sharing" },
            { title: "T3 2025", url: "https://drive.google.com/file/d/1sVwjyuzRqbBL7nelzEcdS5qkqvA_FML5/view?usp=sharing" }
        ],

        youtube: [
            {
                title: "Eduphile",
                url: "https://www.youtube.com/@Eduphile",
                logo: "https://yt3.googleusercontent.com/ytc/AIdro_kZBvI3DkhCCYII_QAOruOERNOwDWIqXk2WAblc6KuZRQ=s160-c-k-c0x00ffffff-no-rj"
            },
            {
                title: "Pankaj Physics Gulati",
                url: "https://www.youtube.com/@pankajphysicsgulati",
                logo: "https://yt3.googleusercontent.com/ytc/AIdro_mWGLtz--dAvtJmX8OyjmaWOyWR0or_DXISG0Ckc-8LCMs=s160-c-k-c0x00ffffff-no-rj"
            }
        ],

        books: [

        ]
    },
    "24B11HS111": {
        courseDesc: "https://drive.google.com/file/d/1IQNhyEmS09OjeqlG_kJwxVcjMGT50-cl/view?usp=sharing",

        lectures: [
            { title: "UHV Best Notes", url: "https://drive.google.com/file/d/17lpgw6iooEM9sWrK7PGLHGu7khnIjP_y/view?usp=sharing" },
            { title: "Lecture 1", url: "https://drive.google.com/file/d/1ds0enlUKCySIhc2M1BQibREFVrjxDuKW/view?usp=sharing" },
            { title: "Lecture 2", url: "https://drive.google.com/file/d/1ozHvXX6_YVIrCXbrMkh-V8zaFYjR6g6L/view?usp=sharing" },
            { title: "Lecture 3", url: "https://drive.google.com/file/d/16wHCxuIa01pWRa_qp2LwtH_giRo893nA/view?usp=sharing" },
            { title: "Lecture 4", url: "https://drive.google.com/file/d/1bw3t7ih_Xnk4tS3ANwjJnANNKY4MLRG1/view?usp=sharing" },
            { title: "Lecture 5", url: "https://drive.google.com/file/d/1ZCvTFc50HAkILNnWM9uok0iTN_IlKTBe/view?usp=sharing" },
            { title: "Lecture 6", url: "https://drive.google.com/file/d/1K4EMHE_MhCwSmAE-d9LYBmjWJl3-_JUv/view?usp=sharing" },
            { title: "Lecture 7", url: "https://drive.google.com/file/d/1p2EpFZbZJEYO5nTWSrFSNqcJmz1StNe_/view?usp=sharing" },
            { title: "Lecture 8", url: "https://drive.google.com/file/d/18IlM7fDhC66XO4K7X5nXzHgHm1dZ66e8/view?usp=sharing" },
            { title: "Lecture 9", url: "https://drive.google.com/file/d/1HMcLuOXJ-sd69xiKz2cN07nLbAAMuwQ9/view?usp=sharing" },
            { title: "Lecture 10", url: "https://drive.google.com/file/d/1feZC1MzwxX3dNFzA-lGmc9le9mL0ZlbR/view?usp=sharing" },
            { title: "Lecture 11", url: "https://drive.google.com/file/d/1yc9e7FkHwe3UpNLNbOL1BhBajBZQKj40/view?usp=sharing" },
            { title: "Lecture 12", url: "https://drive.google.com/file/d/1uJi4T4kCKKOsKgcg9YmnyALwmdxHNQiq/view?usp=sharing" },
            { title: "Lecture 13", url: "https://drive.google.com/file/d/1khYdQOd92VgUvYugYsns5INb0yI6e2Ak/view?usp=sharing" },
            { title: "Lecture 14", url: "https://drive.google.com/file/d/1jLW2nYwPitDl63_g1oiq8xxKExdEG2Z1/view?usp=sharing" },
            { title: "Lecture 15", url: "https://drive.google.com/file/d/1yb2MseZP8n6aweHIBVQoxJv_HMKU3jU8/view?usp=sharing" },
            { title: "Lecture 16", url: "https://drive.google.com/file/d/18W8rJ4i-hcS16cE2TiQL_Duw5tWAqp0m/view?usp=sharing" },
            { title: "Lecture 17", url: "https://drive.google.com/file/d/1-RYzZhcwkScNQFOHkhPlK64H_ty1pl2x/view?usp=sharing" },
            { title: "Lecture 18", url: "https://drive.google.com/file/d/1FHWsYdiAOs8hQvR9Bf-FKzi4om5u4J71/view?usp=sharing" },
            { title: "Lecture 19", url: "https://drive.google.com/file/d/1o446YCQZXliO_areAgESErO73cxM7qCc/view?usp=sharing" },
            { title: "Lecture 20", url: "https://drive.google.com/file/d/1nljXUd0pyO5HVYecEkWlYoL6pbW8yOZ6/view?usp=sharing" },
            { title: "Lecture 21", url: "https://drive.google.com/file/d/1Ymq14VuvL_qfk7c3jr1Kkrjk7oaYy6dz/view?usp=sharing" },
            { title: "Lecture 22", url: "https://drive.google.com/file/d/1uulxwhZ1XeG8VLF3tLkPI1R-lwM5FIU-/view?usp=sharing" },
            { title: "Lecture 23", url: "https://drive.google.com/file/d/1kJ3VCnsLobwcBgjPgPMr7mD07C967kt-/view?usp=sharing" },
            { title: "Lecture 24", url: "https://drive.google.com/file/d/1oRuimcOED39dSZM9E-qa6uP6ZgygbwCr/view?usp=sharing" },
            { title: "Lecture 25", url: "https://drive.google.com/file/d/1bAjK-gTfdEDWqfrC6o7m8L7BPsdoiBSZ/view?usp=sharing" },
            { title: "Lecture 26", url: "https://drive.google.com/file/d/1efbZZKoawpFGilapPpfY_Jx1tyAoAi6N/view?usp=sharing" },
            { title: "Lecture 27", url: "https://drive.google.com/file/d/1yktJDY9Vr4iLvCK4jDhCj-q3f7buNaQI/view?usp=sharing" },
            { title: "Lecture 28", url: "https://drive.google.com/file/d/1XIHcijhJAOxLWEyffhOoKR0jJydyyzIa/view?usp=sharing" }
        ],

        tutorials: [
            { title: "Practice Sheet 1–14", url: "https://drive.google.com/file/d/1Ax0_djG1UWe3iB5xWLGVFfz5d_pxEUPb/view?usp=sharing" },
            { title: "PS 1 Solutions", url: "https://drive.google.com/file/d/1xTCummfvfHB-sgFZa6pTrl_QVDbzalOX/view?usp=sharing" },
            { title: "PS 2 Solutions", url: "https://drive.google.com/file/d/147iMIaUNBvzuDsk8Aq0SRuuTQj3pKkci/view?usp=sharing" },
            { title: "PS 3 Solutions", url: "https://drive.google.com/file/d/19gzqfzkn4pI2dr5Qv4yLDb_gRPHnyrI7/view?usp=sharing" },
            { title: "PS 4 Solutions", url: "https://drive.google.com/file/d/14dAf-5ERXvbypEDwcQU8OKBcLaZ0RyWr/view?usp=sharing" },
            { title: "PS 5 Solutions", url: "https://drive.google.com/file/d/1rsPrxEwDUmyYnYD87r3KudcTY7Atrzlg/view?usp=sharing" },
            { title: "PS 6 Solutions", url: "https://drive.google.com/file/d/1CIQoZQvyxc7R5wLs4Suxy3Y2JoqcJHlg/view?usp=sharing" },
            { title: "PS 7 Solutions", url: "https://drive.google.com/file/d/1nzY_edlo4IVySvRHRoAneGcVWMIzJ429/view?usp=sharing" },
            { title: "PS 8 Solutions", url: "https://drive.google.com/file/d/1Jssae2Q9oxLKJblI05LJSZbKNHhu85GY/view?usp=sharing" },
            { title: "PS 9 Solutions", url: "https://drive.google.com/file/d/1bVBeDks4v-x5IXcV9k2B_xJq99vf-TEE/view?usp=sharing" },
            { title: "PS 11–14 Solutions", url: "https://drive.google.com/file/d/1XJSa9yCQPAfAPzqGruXL1Hk8J3EGv3Et/view?usp=sharing" },
            { title: "UHV Question Bank", url: "https://drive.google.com/file/d/14VKhjGqqQt6ALN8hasEmL3F-Ffj-gg-_/view?usp=sharing" }
        ],

        pyqs: [
            { title: "End Term 2025 (Sem 2)", url: "https://drive.google.com/file/d/1Nf0HYQXZ2hnJWy6IXl5b4hFSZH84rq-9/view?usp=sharing" },
            { title: "End Term 2025 (Sem 4)", url: "https://drive.google.com/file/d/1QSagz0xppZvhDoLuxw_wAKswcxp2_ZN4/view?usp=sharing" }
        ],

        youtube: [
            {
                title: "I Tech World (AKTU)",
                url: "https://www.youtube.com/@itechworldxrt",
                logo: "https://yt3.googleusercontent.com/pBNPs1Yf1eEAvHy57ir61EEeL0XSXZRm28FP9cXfqS0PSGn8b5xhiKrYlEAKE-o27kzfF4RXPw=s160-c-k-c0x00ffffff-no-rj"
            }
        ],

        books: [

        ]
    },
    "24B15CS121": {
        courseDesc: "",
        lectures: [],
        assignments: [
            { title: "Week 0 (with solutions)", url: "https://drive.google.com/file/d/1Yo614Uly7_Qa6U2zdFV160UzRrzJhudO/view?usp=sharing" },
            { title: "Week 1+2 (with solutions)", url: "https://drive.google.com/file/d/1CWINoqgn1UyfZZE7n_m_GspcZzHj_g9j/view?usp=sharing" },
            { title: "Week 3 (with solutions)", url: "https://drive.google.com/file/d/1Q8bfTdMHHcdWqb9gNA9vZpgMKuHGwnB6/view?usp=sharing" },
            { title: "Week 4 (with solutions)", url: "https://drive.google.com/file/d/1V5PfiHCndmSbGNWEgZK07TMA4HL1cXrW/view?usp=sharing" },
            { title: "Week 5 (with solutions)", url: "https://drive.google.com/file/d/13cVMmvkmH51Y5T52YnD574ELn1cqLovX/view?usp=sharing" },
            { title: "Week 6 (with solutions)", url: "https://drive.google.com/file/d/19zvp0fkAwkCj0yIyKPBaqRQS-V2K0du7/view?usp=sharing" },
            { title: "Week 7 (with solutions)", url: "https://drive.google.com/file/d/1-nTL34x-Lml_ygcZPavmAd35ZJWdMn41/view?usp=sharing" },
            { title: "Week 8 (with solutions)", url: "https://drive.google.com/file/d/1dGXhx_d3ZuoARbhoHdtujBe-SpHMO1YZ/view?usp=sharing" },
            { title: "Week 9 (with solutions)", url: "https://drive.google.com/file/d/1Rxv_YXCYGoUSjuAwWwpy4vYxK1vB37KK/view?usp=sharing" },
            { title: "Week 10 (with solutions)", url: "https://drive.google.com/file/d/1J8Ho2u4D7FjYxY4XFvBUzRnTMAhOgDCJ/view?usp=sharing" },
            { title: "Week 11 (with solutions)", url: "https://drive.google.com/file/d/1yMiueuL-qUmrUiPTQT_v2N1AEH-ufFoJ/view?usp=sharing" }
        ],

        pyqs: [
            { title: "Eval 2 (Paper 1)", url: "https://drive.google.com/file/d/1RXzftxoMGSnlgU4xOdsdHRFPWzY85NZo/view?usp=sharing" },
            { title: "Eval 2 (Paper 2)", url: "https://drive.google.com/file/d/1JMSek2xuUjfaERDsWxxbberOvnA37iKm/view?usp=sharing" },
            { title: "Lab Test 1 (Paper 1)", url: "https://drive.google.com/file/d/1P-RzpRhRunzBsESqb0sKrr8NM79dpVqA/view?usp=sharing" },
            { title: "Lab Test 1 (Paper 2)", url: "https://drive.google.com/file/d/1p3j-0OgKj7AtZWhoY5dMqbHZwcZbTUdI/view?usp=sharing" },
            { title: "Lab Test 2 (Paper 1)", url: "https://drive.google.com/file/d/1ms8zdFva-IPuFVXLEhVibIJmmhCWKaqX/view?usp=sharing" },
            { title: "Lab Test 2 (Paper 2)", url: "https://drive.google.com/file/d/1m1CnmB0WFFS2IKBiAsUxqZAm5S5DPZWG/view?usp=sharing" }
        ]
    },

    "15B17PH271": {
        courseDesc: "https://drive.google.com/file/d/1pwXvRKCv0hg3OXJp09caxQU4z6SbzjZ3/view?usp=sharing",

        lectures: [
            { title: "Lab Manual", url: "https://drive.google.com/file/d/160KAcP-0hF8y9FXzpIbf3I0Nx0AqWPLB/view?usp=sharing" },
            { title: "How to report an experiment", url: "https://drive.google.com/file/d/1BexebqJW7TvGT_Lpblp1FX6bQlgkx7tE/view?usp=sharing" },
            { title: "List of Virtual Lab Experiment", url: "https://drive.google.com/file/d/1cJLb5EndlVutacY0jMFQ1TwKltudTabr/view?usp=sharing" },
            { title: "Virtual Lab (file)", url: "https://drive.google.com/file/d/1nWhdTQMsVHwJf-Gn7uRQh7AaBHnxIMpZ/view?usp=sharing" },
            { title: "Exp 1-b - video", url: "https://drive.google.com/file/d/11RMNiSFA19kTvly9d7Hql13Ao59wmVFf/view?usp=sharing" },
            { title: "Exp 2 - video", url: "https://drive.google.com/file/d/1SUp-hRom52G0843BGvu2XS-QYYzHQSku/view?usp=sharing" },
            { title: "Exp 3 - video", url: "https://drive.google.com/file/d/1YsLWY1tSt-gt4OOHA95zu2qwG3nFd_BH/view?usp=sharing" },
            { title: "Exp 4 - video", url: "https://drive.google.com/file/d/17uggwekYoIr0rcFq4022x8DGDPJJLt9f/view?usp=sharing" },
            { title: "Exp 5-a - video", url: "https://drive.google.com/file/d/1lQNyKme5poq3hSxh2a2e9b3rdzM7vpdL/view?usp=sharing" },
            { title: "Exp 5-b - video", url: "https://drive.google.com/file/d/14QKAgIS4iG12Z9EszchnW1SbVKx2eky-/view?usp=sharing" },
            { title: "Exp 6-a - video", url: "https://drive.google.com/file/d/1zp5eQAdPo63RSNgcE6kb-VpfxfGPpEB4/view?usp=sharing" },
            { title: "Exp 6-b - video", url: "https://drive.google.com/file/d/1J5zqudO52iffddn96S3R7aaynJPJrIRk/view?usp=sharing" },
            { title: "Exp 7 - video", url: "https://drive.google.com/file/d/1RFqPJ1jSs4rNUsl8uODSYPsSORHizZ2_/view?usp=sharing" },
            { title: "Exp 8-a - video", url: "https://drive.google.com/file/d/1K83aTuY2KyhDgqHowPCi2SwcMCPt6zaJ/view?usp=sharing" },
            { title: "Exp 8-b - video", url: "https://drive.google.com/file/d/1JLbchvofjSC6sgOrpgBng8py5CeIrF1Y/view?usp=sharing" },
            { title: "Exp 9-a - video", url: "https://drive.google.com/file/d/12notu0nQIQJP_XiLp19S87KYw2UN18Gp/view?usp=sharing" },
            { title: "Exp 10 - video", url: "https://drive.google.com/file/d/1RFA-EEfUQVIQe7MUT-msLrauj7RUQGau/view?usp=sharing" }
        ],
        assignments: [],
        pyqs: []
    },
    "18B15GE112": {
        courseDesc: "https://drive.google.com/file/d/1R-QNm_5yGyBOcVhB0p8nDQyjb6ih3hbz/view?usp=sharing",

        lectures: [
            {
                title: "Lab Manual (All modules)",
                url: "https://drive.google.com/file/d/1RxxrguuY_u7mVAWshR0AD-of4tV2oUzq/view?usp=sharing"
            },
            {
                title: "Workshop Tools (Image)",
                url: "https://drive.google.com/file/d/1co60Z2kEK4jaVfoj826-XhsuvAoKYN-_/view?usp=sharing"
            }
        ],
        assignments: [],
        pyqs: []
    },
    "24B16HS111": {
        courseDesc: "https://drive.google.com/file/d/1WKAmb1_oivj1aRqtrK9-fan04CskZXmS/view?usp=sharing",
        lectures: [
            {
                title: "Week 1 – session 1",
                url: "https://drive.google.com/file/d/12v-AuL5DhVGf4FhbhKQUILUSB7t1NLtd/view?usp=sharing"
            },
            {
                title: "Week 1 – session 2",
                url: "https://drive.google.com/file/d/18wc_kBg9hMgnf0jttNj5d__NEiBwqJQv/view?usp=sharing"
            },
            {
                title: "Week 2 – session 1",
                url: "https://drive.google.com/file/d/1AD2dtgziRkfeJN-NoftRS8c7QKblljl7/view?usp=sharing"
            },
            {
                title: "Week 2 – session 2",
                url: "https://drive.google.com/file/d/1c0f4ombDeIzfvYqfFGks_c9SJmerS6IS/view?usp=sharing"
            },
            {
                title: "Week 3 – session 1",
                url: "https://drive.google.com/file/d/17aQMqcoYtm-zkiZJp2231d-ezU_HV3ms/view?usp=sharing"
            },
            {
                title: "Week 3 – session 2",
                url: "https://drive.google.com/file/d/1vqLYXR9ayOBArXl6WRqdkT-P9gcu8sUh/view?usp=sharing"
            },
            {
                title: "Week 5(1)",
                url: "https://drive.google.com/file/d/1c7i-p4WVoTF1c8pPTf9GNErmsG7ldGTI/view?usp=sharing"
            },
            {
                title: "Week 5(2)",
                url: "https://drive.google.com/file/d/1v8cRsY5rD9nKxKZcjMoOZ7hGHmizXfBy/view?usp=sharing"
            },
            {
                title: "Week 5 – activity 1",
                url: "https://drive.google.com/file/d/1FS6ZSgJb532hoob3oCfrrJDLwmlSyX39/view?usp=sharing"
            },
            {
                title: "Week 5 – activity 2",
                url: "https://drive.google.com/file/d/1rHJAFiGCiNryULNa2APPM01hW16hBMHt/view?usp=sharing"
            },

            {
                title: "Week 6 – session 1",
                url: "https://drive.google.com/file/d/1d0A_3IAwfwvYZTrCbge6ezEfqt6mwZSP/view?usp=sharing"
            },
            {
                title: "Week 6 – session 2",
                url: "https://drive.google.com/file/d/1mjaEh9GamuIWGRgXoz3iGdtB-fcgDbi2/view?usp=sharing"
            },
            {
                title: "Week 9 – reading 1",
                url: "https://drive.google.com/file/d/16_pU4V47oeYKO3A73bULZK-aS1ajMBEv/view?usp=sharing"
            },
            {
                title: "Week 9 – reading 2",
                url: "https://drive.google.com/file/d/1jT2yEZ5rHtcvl-8jChVLuEwPJtwKJXLH/view?usp=sharing"
            },
            {
                title: "Week 9 – practice",
                url: "https://drive.google.com/file/d/1AG7l2cfkuDQdVdy3QNhM2XGvId7qG2AR/view?usp=sharing"
            },

            {
                title: "Week 10",
                url: "https://drive.google.com/file/d/1LcEFosyPqWE8mdy0RuOyqhOIEzcaL3aK/view?usp=sharing"
            },
            {
                title: "Week 11(1)",
                url: "https://drive.google.com/file/d/1nt44tFJM7t1BfTzT4gstaAerCOjqrbmG/view?usp=sharing"
            },
            {
                title: "Week 11(2)",
                url: "https://drive.google.com/file/d/1f_QcqvZsP0KHaxSPxWHk_YRMK0Uj0sMA/view?usp=sharing"
            }
        ],
        assignments: [],
        pyqs: []
    }
};

