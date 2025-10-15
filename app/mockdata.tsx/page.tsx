export const Courses = [
  {
    id: "cloud-engineering",
    title: "Cloud Engineering",
    description:
      "Learn how to build and manage scalable cloud infrastructure using AWS, Azure, and GCP.",
    level: "Beginner",
    instructor: "Dr. Ada Lovelace",
    duration: "12 Weeks",
    image: "/images/ai.jpg",
    moduleIds: [1, 2, 3],
    modules: [
      {
        id: "mod-1",
        title: "Introduction to Cloud Computing",
        description:
          "Understand the basics of cloud technology and deployment models.",
        duration: "2 Weeks",
        content: [
          { id: "c1", type: "video", title: "What is Cloud Computing?" },
          { id: "c2", type: "reading", title: "Cloud Models Explained" },
        ],
        quiz: { title: "Intro Quiz" },
      },
      {
        id: "mod-2",
        title: "Networking & Storage in the Cloud",
        description: "Learn how cloud services manage storage and networking.",
        duration: "4 Weeks",
        content: [
          { id: "c3", type: "lab", title: "Configuring Cloud Storage" },
          { id: "c4", type: "video", title: "Cloud Networking Basics" },
        ],
      },
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    description: "Design and develop scalable web applications.",
    level: "Intermediate",
    instructor: "John Doe",
    duration: "10 Weeks",
    image: "/images/software.jpg",
    moduleIds: [1, 2],
    modules: [
      {
        id: "mod-1",
        title: "Frontend Development",
        description: "Learn React, TypeScript, and UI best practices.",
        duration: "3 Weeks",
        content: [
          { id: "c1", type: "video", title: "React Basics" },
          { id: "c2", type: "lab", title: "Build a Simple App" },
        ],
      },
      {
        id: "mod-2",
        title: "Backend Development",
        description: "APIs, databases, and server architecture.",
        duration: "4 Weeks",
        content: [
          { id: "c3", type: "video", title: "Node.js Crash Course" },
          { id: "c4", type: "reading", title: "Database Design" },
        ],
        quiz: { title: "Final Assessment" },
      },
    ],
  },
];
