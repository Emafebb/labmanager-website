import { ChefHat } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ChefHat size={24} className="text-primary-light" />
            <span className="text-lg font-bold tracking-wide">LABMANAGER</span>
          </div>

          {/* Links */}
          <ul className="flex gap-8 text-sm text-gray-400">
            <li>
              <a href="#funzionalita" className="hover:text-white transition-colors">
                Funzionalit&agrave;
              </a>
            </li>
            <li>
              <a href="#piattaforme" className="hover:text-white transition-colors">
                Piattaforme
              </a>
            </li>
            <li>
              <a href="#download" className="hover:text-white transition-colors">
                Download
              </a>
            </li>
            <li>
              <a href="#contatti" className="hover:text-white transition-colors">
                Contatti
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {year} LabManager. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
