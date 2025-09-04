import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'Apa itu program digitalisasi UMKM Stride?',
      answer: 'Program digitalisasi UMKM Stride adalah platform komprehensif yang membantu usaha kecil dan menengah untuk go-digital. Kami menyediakan tools, pelatihan, dan pendampingan untuk membantu UMKM meningkatkan penjualan melalui platform digital.'
    },
    {
      question: 'Berapa biaya untuk bergabung dengan Stride?',
      answer: 'Kami menawarkan paket fleksibel mulai dari Rp 50.000/bulan untuk paket basic. Tersedia juga program gratis untuk UMKM yang baru memulai digitalisasi dengan fitur terbatas.'
    },
    {
      question: 'Apakah ada pelatihan untuk menggunakan platform?',
      answer: 'Ya! Kami menyediakan pelatihan lengkap mulai dari setup toko online, digital marketing, hingga strategi penjualan. Pelatihan tersedia dalam bentuk video tutorial, webinar, dan mentoring 1-on-1.'
    },
    {
      question: 'Bagaimana cara kerja sistem pembayaran?',
      answer: 'Stride terintegrasi dengan berbagai payment gateway seperti GoPay, OVO, DANA, dan transfer bank. Semua transaksi aman dan otomatis masuk ke rekening UMKM partner.'
    },
    {
      question: 'Apakah data UMKM aman di platform Stride?',
      answer: 'Keamanan data adalah prioritas utama kami. Semua data dienkripsi dengan standar bank dan disimpan di server yang aman. Kami juga memiliki backup otomatis untuk mencegah kehilangan data.'
    },
    {
      question: 'Bagaimana cara mendapatkan dukungan teknis?',
      answer: 'Tim support kami tersedia 24/7 melalui WhatsApp, email, dan live chat. Kami juga memiliki knowledge base lengkap dan community forum untuk saling berbagi tips.'
    },
    {
      question: 'Apakah bisa integrasi dengan marketplace lain?',
      answer: 'Ya, platform Stride dapat terintegrasi dengan marketplace populer seperti Tokopedia, Shopee, dan Bukalapak. Ini memungkinkan UMKM mengelola semua channel penjualan dari satu dashboard.'
    },
    {
      question: 'Berapa lama proses setup toko online?',
      answer: 'Proses setup basic bisa selesai dalam 1-2 hari kerja. Untuk setup lengkap dengan customization dan pelatihan, biasanya membutuhkan 1-2 minggu tergantung kompleksitas kebutuhan UMKM.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Temukan jawaban untuk pertanyaan yang sering diajukan tentang digitalisasi UMKM</p>
        </div>
        
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h3>Masih ada pertanyaan?</h3>
          <p>Tim support kami siap membantu Anda 24/7</p>
          <button 
            className="contact-support-btn"
            onClick={() => {
              const message = 'Halo Stride! Saya memiliki pertanyaan tentang program digitalisasi UMKM. Bisa tolong bantu saya?';
              window.open(`https://wa.me/6289506147763?text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            💬 Hubungi Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;