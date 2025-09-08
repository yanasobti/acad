function Footer() {
  return (
    <footer className="bg-black/30 text-gray-400 py-12" id="about">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold gradient-text mb-4">Acadence</h2>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Login</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
        <p>© 2025 Acadence. All rights reserved. Empowering the future of education.</p>
      </div>
    </footer>
  );
}

export default Footer;
