import './globals.css';

export const metadata = {
  title: 'Aria & Kabir — Royal Wedding Invitation | Udaipur 2026',
  description: 'Together with their families, cordially invite you to celebrate their wedding festivities in Udaipur, Rajasthan.',
  keywords: ['Wedding Invitation', 'Aria and Kabir', 'Udaipur Wedding', 'Royal Indian Wedding', 'Oberoi Udaivilas', 'Jagmandir'],
  openGraph: {
    title: 'Aria & Kabir — Royal Wedding Invitation',
    description: 'Cordially inviting you to our wedding celebrations in Udaipur, Rajasthan.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#E8DCB8] selection:text-[#2D2724]">
        {children}
      </body>
    </html>
  );
}
