import { FileText, Mail, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">QuickPDF Tools</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Free online PDF tools for everyone. Merge, split, compress, convert, and edit your PDF files with ease.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><a href="/merge-pdf" className="hover:text-blue-400 transition-colors">Merge PDF</a></li>
              <li><a href="/split-pdf" className="hover:text-blue-400 transition-colors">Split PDF</a></li>
              <li><a href="/compress-pdf" className="hover:text-blue-400 transition-colors">Compress PDF</a></li>
              <li><a href="/pdf-to-word" className="hover:text-blue-400 transition-colors">PDF to Word</a></li>
              <li><a href="/word-to-pdf" className="hover:text-blue-400 transition-colors">Word to PDF</a></li>
              <li><a href="/jpg-to-pdf" className="hover:text-blue-400 transition-colors">JPG to PDF</a></li>
              <li><a href="/rotate-pdf" className="hover:text-blue-400 transition-colors">Rotate PDF</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} QuickPDF Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
