import { AnimatedTestimonials } from "./animated-testimonials";

export default function AnimatedTestimonialsDemo({ small }: { small?: boolean }) {
  const testimonials = [
    {
      quote:
        "Sal-mjarab made it so easy to find a specialist for my mother. The verified reviews helped us choose the right doctor, and booking an appointment was seamless.",
      name: "Fatima Alaoui",
      designation: "Patient from Casablanca",
      src: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "As a healthcare provider, Sal-mjarab has transformed my practice. I've been able to reach more patients and the online appointment system has reduced no-shows significantly.",
      name: "Dr. Ahmed Bennani",
      designation: "Cardiologist, Casablanca",
      src: "https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "The AI chatbot helped me understand my symptoms and find the right specialist. I was able to book an appointment immediately and get the care I needed.",
      name: "Youssef Tazi",
      designation: "Patient from Marrakech",
      src: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "Sal-mjarab's review system is incredibly helpful. I trust the ratings and feedback from other patients when choosing a doctor.",
      name: "Samira El Fassi",
      designation: "Patient from Rabat",
      src: "https://images.pexels.com/photos/5215025/pexels-photo-5215025.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "The platform's telehealth features allowed me to consult with a specialist from home. It's convenient and secure—highly recommended!",
      name: "Dr. Khadija Mansouri",
      designation: "Gynecologist, Rabat",
      src: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} small={small} />;
} 