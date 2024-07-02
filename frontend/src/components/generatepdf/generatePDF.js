import jsPDF from 'jspdf';

const generatePDF = (userData) => {
  const doc = new jsPDF();

  // Set the title
  doc.setFontSize(18);
  doc.text('User Report', 14, 22);

  // Set the user data
  doc.setFontSize(12);
  doc.text(`Name: ${userData.name}`, 14, 30);
  doc.text(`Email: ${userData.email}`, 14, 40);
  doc.text(`Phone Number: ${userData.phoneNumber}`, 14, 50);
  doc.text(`Role: ${userData.role}`, 14, 60);
  doc.text(`Profile Image: ${userData.profileImage}`, 14, 70);
  doc.text(`Bio: ${userData.bio}`, 14, 80);
  doc.text(`Address: ${JSON.stringify(userData.address)}`, 14, 90);
  doc.text(`Social Links: ${JSON.stringify(userData.socialLinks)}`, 14, 100);
  doc.text(`Active: ${userData.isActive}`, 14, 110);
  doc.text(`Last Login: ${userData.lastLogin}`, 14, 120);

  // Save the PDF
  doc.save('user_report.pdf');
};

export default generatePDF;
