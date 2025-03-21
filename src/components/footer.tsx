export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4 mt-9">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Blogging Platform. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built by{" "}
          <a href="https://github.com/AbdallahMarei97" className="underline">
            Abdallah Marei
          </a>
        </p>
      </div>
    </footer>
  );
};
