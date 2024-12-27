import { jsPDF } from 'jspdf';

interface TicketDetails {
  bookingId: string;
  amount: number;
  bus: {
    name: string;
    from: string;
    to: string;
    departureTime: string;
  };
  seats: string[];
}

export function generateTicketPDF(ticketDetails: TicketDetails): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Bus Ticket', pageWidth / 2, 20, { align: 'center' });
  
  // Booking ID
  doc.setFontSize(12);
  doc.text(`Booking ID: ${ticketDetails.bookingId}`, 20, 40);
  
  // Bus Details
  doc.setFontSize(14);
  doc.text('Bus Details', 20, 60);
  doc.setFontSize(12);
  doc.text(`Bus Name: ${ticketDetails.bus.name}`, 20, 70);
  doc.text(`From: ${ticketDetails.bus.from}`, 20, 80);
  doc.text(`To: ${ticketDetails.bus.to}`, 20, 90);
  doc.text(`Departure Time: ${ticketDetails.bus.departureTime}`, 20, 100);
  
  // Seat Details
  doc.setFontSize(14);
  doc.text('Seat Details', 20, 120);
  doc.setFontSize(12);
  doc.text(`Seats: ${ticketDetails.seats.join(', ')}`, 20, 130);
  
  // Payment Details
  doc.setFontSize(14);
  doc.text('Payment Details', 20, 150);
  doc.setFontSize(12);
  doc.text(`Amount Paid: ₹${ticketDetails.amount}`, 20, 160);
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('Thank you for choosing our service!', pageWidth / 2, 200, { align: 'center' });
  
  // Save the PDF
  doc.save(`bus-ticket-${ticketDetails.bookingId}.pdf`);
}