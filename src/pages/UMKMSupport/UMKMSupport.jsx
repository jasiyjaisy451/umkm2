import React from 'react';
import { Link } from 'react-router-dom';
import './UMKMSupport.css';

const UMKMSupport = () => {
  const digitalPrograms = [
    {
      icon: '🚀',
      title: 'Program Digitalisasi Gratis',
      description: 'Pelatihan lengkap dari nol hingga mahir menggunakan platform digital untuk UMKM',
      features: ['Setup toko online', 'Digital marketing', 'Manajemen inventory', 'Customer service']
    },
    {
      icon: '📱',
      title: 'Platform All-in-One',
      description: 'Satu platform untuk semua kebutuhan bisnis digital UMKM Anda',
      features: ['Katalog produk', 'Sistem pemesanan', 'Analytics', 'Payment gateway']
    },
    {
      icon: '🎯',
      title: 'Mentoring Bisnis',
      description: 'Pendampingan langsung dari expert untuk mengembangkan strategi bisnis',
      features: ['Konsultasi 1-on-1', 'Business plan', 'Market analysis', 'Growth strategy']
    }
  ];

  const successStories = [
    {
      name: 'Batik Nusantara',
      owner: 'Ibu Sari',
      location: 'Yogyakarta',
      growth: '400%',
      story: 'Dari penjualan offline 2-3 batik per hari, sekarang bisa menjual 15-20 batik per hari melalui platform digital',
      image: 'https://images.pexels.com/photos/5625120/pexels-photo-5625120.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Keripik Singkong Mama',
      owner: 'Pak Budi',
      location: 'Malang',
      growth: '250%',
      story: 'Berhasil ekspansi ke seluruh Indonesia dan bahkan ekspor ke Malaysia berkat digitalisasi',
      image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Tas Rajut Kreatif',
      owner: 'Ibu Dewi',
      location: 'Bandung',
      growth: '350%',
      story: 'Dari usaha rumahan menjadi brand nasional dengan 50+ reseller di berbagai kota',
      image: 'https://images.pexels.com/photos/5625122/pexels-photo-5625122.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const whyChooseUs = [
    {
      icon: '💡',
      title: 'Mudah Dipelajari',
      description: 'Interface yang user-friendly dan tutorial step-by-step yang mudah diikuti'
    },
    {
      icon: '💰',
      title: 'Biaya Terjangkau',
      description: 'Paket berlangganan mulai dari Rp 50.000/bulan dengan fitur lengkap'
    },
    {
      icon: '🛡️',
      title: 'Keamanan Terjamin',
      description: 'Data dan transaksi Anda aman dengan enkripsi tingkat bank'
    },
    {
      icon: '📞',
      title: 'Support 24/7',
      description: 'Tim customer service siap membantu kapan saja Anda membutuhkan'
    },
    {
      icon: '📈',
      title: 'Analytics Mendalam',
      description: 'Laporan penjualan dan analisis customer behavior untuk optimasi bisnis'
    },
    {
      icon: '🌐',
      title: 'Jangkauan Nasional',
      description: 'Akses ke pasar seluruh Indonesia melalui marketplace terintegrasi'
    }
  ];

  return (
    <div className="umkm-support">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="support-hero-container">
          <div className="hero-content">
            <h1>Wujudkan Impian UMKM Digital Bersama Stride</h1>
            <p>
              Platform digitalisasi UMKM terpercaya yang telah membantu 500+ UMKM Indonesia 
              meningkatkan penjualan hingga 400% melalui transformasi digital
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">UMKM Partner</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">89%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">400%</span>
                <span className="stat-label">Avg Growth</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/register" className="cta-primary">
                Mulai Digitalisasi Gratis
              </Link>
              <button 
                className="cta-secondary"
                onClick={() => {
                  const message = 'Halo Stride! Saya tertarik untuk mengetahui lebih lanjut tentang program digitalisasi UMKM. Bisa tolong berikan informasi lengkapnya?';
                  window.open(`https://wa.me/6289506147763?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                Konsultasi Gratis
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
              alt="UMKM Digital Transformation" 
            />
          </div>
        </div>
      </section>

      {/* Digital Programs */}
      <section className="digital-programs">
        <div className="programs-container">
          <h2>Program Digitalisasi UMKM</h2>
          <p>Paket lengkap untuk transformasi digital UMKM Anda</p>
          
          <div className="programs-grid">
            {digitalPrograms.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-icon">{program.icon}</div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <ul className="program-features">
                  {program.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className="program-btn">Pelajari Lebih Lanjut</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="why-container">
          <h2>Mengapa Memilih Stride untuk Digitalisasi UMKM?</h2>
          <div className="why-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <div className="stories-container">
          <h2>Kisah Sukses UMKM Partner</h2>
          <p>Lihat bagaimana UMKM Indonesia berkembang pesat dengan Stride</p>
          
          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-image">
                  <img src={story.image} alt={story.name} />
                  <div className="growth-badge">+{story.growth}</div>
                </div>
                <div className="story-content">
                  <h3>{story.name}</h3>
                  <p className="story-owner">Pemilik: {story.owner} • {story.location}</p>
                  <p className="story-text">"{story.story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="process-steps">
        <div className="process-container">
          <h2>Langkah Mudah Digitalisasi UMKM</h2>
          <div className="steps-timeline">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Daftar & Konsultasi</h3>
                <p>Daftar gratis dan konsultasi dengan tim expert kami untuk analisis kebutuhan bisnis</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Setup Platform</h3>
                <p>Tim kami membantu setup toko online, katalog produk, dan sistem pembayaran</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Pelatihan Intensif</h3>
                <p>Pelatihan digital marketing, social media, dan strategi penjualan online</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Go Live & Monitoring</h3>
                <p>Launch toko online dan monitoring performa dengan dukungan tim kami</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="support-cta">
        <div className="cta-container">
          <h2>Siap Mengembangkan UMKM Anda?</h2>
          <p>Bergabunglah dengan 500+ UMKM yang telah sukses go-digital bersama Stride</p>
          <div className="cta-actions">
            <Link to="/register" className="cta-primary">
              Daftar Sekarang - Gratis!
            </Link>
            <button 
              className="cta-secondary"
              onClick={() => {
                const message = 'Halo Stride! Saya ingin konsultasi tentang program digitalisasi UMKM. Mohon informasi lengkapnya.';
                window.open(`https://wa.me/6289506147763?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              💬 Chat WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UMKMSupport;