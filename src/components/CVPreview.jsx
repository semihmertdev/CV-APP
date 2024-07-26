import React from 'react';
import { FaLinkedin, FaGithub, FaGlobe, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/CVPreview.css';

const CVPreview = ({ generalInfo, education, experience, courses, skills }) => {
  const formatDate = (date) => {
    if (!date) return '';
    const [month, year] = date.split('/');
    if (month && year) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = parseInt(month, 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        const monthName = monthNames[monthIndex];
        return `${monthName} ${year}`;
      }
    }
    return '';
  };

  const downloadPDF = () => {
    const input = document.getElementById('cv-preview');
    
    // html2canvas ile canvas oluşturma
    html2canvas(input, { scale: 1.5 }).then((canvas) => { // Ölçeklemeyi 1.5 olarak ayarladık
      const imgData = canvas.toDataURL('image/png', 0.5); // Kaliteyi %50'ye düşürdük
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // PDF sayfa boyutlarını al
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Canvas boyutlarını al
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Oranı hesapla ve imgScaledHeight'i belirle
      const ratio = imgWidth / pdfWidth;
      const imgScaledHeight = imgHeight / ratio;
      
      let heightLeft = imgScaledHeight;
      let position = 0;
      
      // İlk sayfayı ekle
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgScaledHeight);
      heightLeft -= pdfHeight;
      
      // Sayfa eklemeye devam et
      while (heightLeft >= 0) {
        position = heightLeft - imgScaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgScaledHeight);
        heightLeft -= pdfHeight;
      }
      
      // PDF dosyasını kaydet
      pdf.save('cv.pdf');
    });
  };
  

  return (
    <div>
      <div id="cv-preview" className="cv-preview">
        {generalInfo.name || generalInfo.title ? (
          <div className="cv-section">
            <div className="general-info-container">
              {generalInfo.name && (
                <div className="general-info-item">
                  <p className="general-info-name">{generalInfo.name}</p>
                </div>
              )}
              {generalInfo.title && (
                <div className="general-info-item">
                  <p className="general-info-title">{generalInfo.title}</p>
                </div>
              )}
            </div>
            <div className="icon-section">
              {generalInfo.email && (
                <div className="icon-text">
                  <div className="icon1">
                  <FaEnvelope />
                  </div>
                  <p>{generalInfo.email}</p>
                </div>
              )}
              {generalInfo.phone && (
                <div className="icon-text">
                  <div className="icon1">
                  <FaPhone />
                  </div>
                  <p>{generalInfo.phone}</p>
                </div>
              )}
              {generalInfo.address && (
                <div className="icon-text">
                  <div className="icon1">
                  <FaHome />
                  </div>
                  <p>{generalInfo.address}</p>
                </div>
              )}
              {generalInfo.links && generalInfo.links.length > 0 && (
                <div className="cv-section">
                  {generalInfo.links.map((link, index) => (
                    <div key={index} className="cv-link">
                      {link.type === 'linkedin' && <FaLinkedin />}
                      {link.type === 'github' && <FaGithub />}
                      {link.type === 'website' && <FaGlobe />}
                      {link.type === 'other' && <FaGlobe />}
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        ) : null}

        {education && education.length > 0 && (
          <div className="cv-section">
            <h3>Educational Experience</h3>
            {education.map((edu, index) => (
              <div key={index} className="cv-entry">
                <div className="cv-entry-details">
                  <div className="education-1">
                    <div className="cv-entry-field">
                      <p className="degree">{edu.degree}</p>
                    </div>
                    <div className="cv-entry-field">
                      <p className="institution">{edu.institution}</p>
                    </div>
                    <div className="cv-entry-field">
                      <p className="description">{edu.description}</p>
                    </div>
                  </div>
                  <div className="education-2">
                    <div className="cv-entry-field">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                    <div className="cv-entry-field">
                      <p className="country">{edu.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {experience && experience.length > 0 && (
          <div className="cv-section">
            <h3>Practical Experience</h3>
            {experience.map((exp, index) => (
              <div key={index} className="cv-entry">
                <div className="cv-entry-details">
                  <div className="professional-1">
                    <div className="cv-entry-field">
                      <p className="company">{exp.company}</p>
                    </div>
                    <div className="cv-entry-field">
                      <p className="position">{exp.position}</p>
                    </div>
                    <div className="cv-entry-field">
                      <p className="description">{exp.description}</p>
                    </div>
                  </div>
                  <div className="professional-2">
                    <div className="cv-entry-field">
                      <p className="dates">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                    </div>
                    <div className="cv-entry-field">
                      <p className="country">{exp.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {courses && courses.length > 0 && (
          <div className="cv-section">
            <h3>Courses and Certificates</h3>
            {courses.map((course, index) => (
              <div key={index} className="cv-entry">
                <div className="cv-entry-details">
                  <div className="cours-cert-1">
                    <div className="cv-entry-field">
                      <p className="title">{course.title}</p>
                    </div>
                    <div className="cv-entry-field">
                      <p className="institution">{course.institution}</p>
                    </div>
                  </div>
                  <div className="cv-entry-field">
                    <p className="date">{formatDate(course.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="cv-section">
            <h3>Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="download-btn">
      <button onClick={downloadPDF}>Download as PDF</button>
      </div>
    </div>
  );
};

export default CVPreview;
