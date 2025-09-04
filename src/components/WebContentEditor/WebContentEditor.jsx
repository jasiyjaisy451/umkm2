import React, { useState } from 'react';
import './WebContentEditor.css';

const WebContentEditor = ({ content, onSave }) => {
  const [formData, setFormData] = useState(content);
  const [activeSection, setActiveSection] = useState('profile');

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item, i) => 
          i === index ? value : item
        )
      }
    }));
  };

  const addArrayItem = (section, field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], defaultValue]
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAdvantageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      advantages: prev.advantages.map((advantage, i) =>
        i === index ? { ...advantage, [field]: value } : advantage
      )
    }));
  };

  const addAdvantage = () => {
    setFormData(prev => ({
      ...prev,
      advantages: [...prev.advantages, { title: '', description: '' }]
    }));
  };

  const removeAdvantage = (index) => {
    setFormData(prev => ({
      ...prev,
      advantages: prev.advantages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="web-content-editor">
      <div className="editor-tabs">
        <button 
          className={`tab-btn ${activeSection === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveSection('profile')}
        >
          🏢 Profil Perusahaan
        </button>
        <button 
          className={`tab-btn ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveSection('contact')}
        >
          📞 Informasi Kontak
        </button>
        <button 
          className={`tab-btn ${activeSection === 'advantages' ? 'active' : ''}`}
          onClick={() => setActiveSection('advantages')}
        >
          ⭐ Keunggulan
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        {/* Company Profile Section */}
        {activeSection === 'profile' && (
          <div className="editor-section">
            <h3>Profil Perusahaan</h3>
            
            <div className="form-group">
              <label>Nama Perusahaan</label>
              <input
                type="text"
                value={formData.companyProfile.name}
                onChange={(e) => handleInputChange('companyProfile', 'name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tagline</label>
              <input
                type="text"
                value={formData.companyProfile.tagline}
                onChange={(e) => handleInputChange('companyProfile', 'tagline', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Deskripsi Perusahaan</label>
              <textarea
                rows="4"
                value={formData.companyProfile.description}
                onChange={(e) => handleInputChange('companyProfile', 'description', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Visi</label>
              <textarea
                rows="3"
                value={formData.companyProfile.vision}
                onChange={(e) => handleInputChange('companyProfile', 'vision', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Misi</label>
              {formData.companyProfile.mission.map((mission, index) => (
                <div key={index} className="array-item">
                  <textarea
                    rows="2"
                    value={mission}
                    onChange={(e) => handleArrayChange('companyProfile', 'mission', index, e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeArrayItem('companyProfile', 'mission', index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-btn"
                onClick={() => addArrayItem('companyProfile', 'mission')}
              >
                + Tambah Misi
              </button>
            </div>
          </div>
        )}

        {/* Contact Information Section */}
        {activeSection === 'contact' && (
          <div className="editor-section">
            <h3>Informasi Kontak</h3>
            
            <div className="form-group">
              <label>Nomor Telepon</label>
              <input
                type="text"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>WhatsApp</label>
              <input
                type="text"
                value={formData.contactInfo.whatsapp}
                onChange={(e) => handleInputChange('contactInfo', 'whatsapp', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Alamat</label>
              <textarea
                rows="3"
                value={formData.contactInfo.address}
                onChange={(e) => handleInputChange('contactInfo', 'address', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Advantages Section */}
        {activeSection === 'advantages' && (
          <div className="editor-section">
            <h3>Keunggulan Platform</h3>
            
            {formData.advantages.map((advantage, index) => (
              <div key={index} className="advantage-editor">
                <div className="advantage-header">
                  <h4>Keunggulan {index + 1}</h4>
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeAdvantage(index)}
                  >
                    ×
                  </button>
                </div>
                <div className="form-group">
                  <label>Judul</label>
                  <input
                    type="text"
                    value={advantage.title}
                    onChange={(e) => handleAdvantageChange(index, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    rows="3"
                    value={advantage.description}
                    onChange={(e) => handleAdvantageChange(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            
            <button 
              type="button" 
              className="add-btn"
              onClick={addAdvantage}
            >
              + Tambah Keunggulan
            </button>
          </div>
        )}

        <div className="editor-actions">
          <button type="submit" className="save-btn">
            💾 Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default WebContentEditor;