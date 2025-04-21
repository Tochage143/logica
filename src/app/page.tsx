import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Markdown Support",
      description: "Seamless writing experience with markdown for notes, journals, and more.",
    },
    {
      title: "Encrypted Storage",
      description: "All your data is securely stored and protected.",
    },
    {
      title: "Graph View",
      description: "Visualize relationships between your notes with interactive graph structures.",
    },
    {
      title: "File System Storage",
      description: "Organized structure for managing content efficiently.",
    },
    {
      title: "Web-Based & Cross-Device",
      description: "Access your knowledge base anywhere, on any device.",
    },
  ];

  const actions = [
    { label: "Login", href: "/Auth" },
    { label: "Register", href: "/Auth" },
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-purple-400 mb-4">
          Knowledge Management System
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          A dynamic platform to write, organize, and visualize your notes and
          journals with powerful markdown support, encryption, and graph-based
          views — accessible from anywhere.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="border border-purple-400 px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 max-w-4xl text-left">
        <h2 className="text-3xl font-semibold text-purple-300 mb-6 text-center">
          Key Features
        </h2>
        <ul className="space-y-4 text-lg text-gray-300 list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index}>
              <span className="font-semibold text-white">{feature.title}:</span>{" "}
              {feature.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-sm text-gray-500">
        © {new Date().getFullYear()} Knowledge Management System. Built with ❤️
      </footer>
    </main>
  );
}
