/* =========================================================
   CLINIC CONFIGURATION
   ---------------------------------------------------------
   To rebrand for a new client, only edit this file.
   No need to touch HTML, CSS, or other JS files.
   ========================================================= */

const CLINIC_CONFIG = {
  // ---------- Branding ----------
  clinicName: "Mishra ",
  clinicTagline: "Multispecialist Clinic",

  // ---------- Doctor ----------
  doctorName: "Dr. K.K. Mishra",
  doctorTitle: "MD Physician · Chiropractor · Spine Specialist",
  doctorQualification: "MBBS, MD (Physician), Consultation Surgeon",

  // ---------- Hero ----------
  heroHighlight: "spine, joints & overall health",
  heroDescription:
    "Dr. K.K. Mishra – MD Physician, Consultation Surgeon, Chiropractor & Spine Specialist. Trusted care in the heart of Dharavi, Mumbai.",
  heroImage: "assets/images/mcmprofile.jpeg",

  // ---------- Stats ----------
  yearsExperience: "15+",
  happyPatients: "5000+",
  rating: "4.9★",

  // ---------- Contact ----------
  phone: "+919967520638",
  phoneDisplay: "+91 99675 20638",
  email: "Krishna9892789623@gmail.com",
  emailDisplay: "Krishna9892789623@gmail.com",
  address: "Dharavi 60ft Road, Near Chota Sion Hospital, Mumbai – 400017",

  // ---------- Timings ----------
  consultationHours: "Mon–Sat · 2 PM – 6 PM & 7 PM – 11 PM",
  afternoonTime: "2:00 PM – 6:00 PM",
  eveningTime: "7:00 PM – 11:00 PM",

  // ---------- Services ----------
  services: [
    {
      icon: "fa-user-md",
      title: "General Consultation",
      description: "Comprehensive physician consultation for all age groups.",
    },
    {
      icon: "fa-bone",
      title: "Spine Care",
      description: "Non-surgical treatment for back pain, slip disc & posture issues.",
    },
    {
      icon: "fa-hand-holding-medical",
      title: "Chiropractic",
      description: "Manual adjustment and alignment for joint and muscle relief.",
    },
    {
      icon: "fa-heartbeat",
      title: "Multispeciality",
      description: "Holistic care combining medicine, physiotherapy & lifestyle advice.",
    },
  ],

  gallery: [
  { src: "assets/images/gallery/mcmbeforeafter1.jpeg", alt: "Clinic reception area" },
  { src: "assets/images/gallery/mcmbeforeafter1.jpeg", alt: "Consultation room" },
  { src: "assets/images/gallery/mcmbeforeafter1.jpeg", alt: "Spine treatment setup" },
  { src: "assets/images/gallery/mcmbeforeafter1.jpeg", alt: "Waiting lounge" },
  { src: "assets/images/gallery/mcmbeforeafter1.jpeg", alt: "Chiropractic equipment" },
  { src: "assets/images/gallery/mcmbeforeafter1.jpeg", alt: "Clinic exterior" },
],
// ---------- Footer ----------
footerDescription:
  "Trusted multispecialist clinic in Dharavi, Mumbai — offering physician consultation, chiropractic care, and spine treatment with a patient-first approach.",

social: {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  twitter: "https://twitter.com/",
  linkedin: "https://linkedin.com/",
  whatsapp: "https://wa.me/919967520638",
},
};




// Make it globally available
window.CLINIC_CONFIG = CLINIC_CONFIG;