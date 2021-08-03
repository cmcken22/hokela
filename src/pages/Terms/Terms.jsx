import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import Page from '../../components/Page';
import DocumentLink from 'Components/DocumentLink';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openLink = (link) => {
    window.open(link, "_blank");
  }

  handleContactUs = () => {
    alert('what do i do here??')
  }

  render() {
    return (
      <Page>
        <Page.Header
          title="Terms of Use"
          breadCrums={[{ name: 'Terms' }]}
        />
        <Page.Section first>
          <div className="terms__section">
            <p>Welcome to Hokela!</p>

            <p>
              Hokela Technologies (“Hokela”) builds technologies and services that enable volunteers to connect with
              organizations, search for volunteer positions, and match ideal candidates with causes. These terms and
              conditions (the “Terms”) govern your use of Hokela, our website (the “Site”), and services (the “Services")
              we offer. By accessing or using this Site, you approve that you have read, understood, and agree to be
              bound by these Terms. If you do not agree to these Terms, then you must refrain from accessing or using
              the Site. All Terms will apply irrespective of the specific use made by Internet users of this Site. This
              Site and all its content are proprietary to Hokela.
            </p>
          </div>
          <div className="terms__section">
            <h2>1. Site content</h2>

            <p>
              The information contained on the pages of this Site is subject to modification and update from time to time
              without notice. Hokela does not guarantee or ensure either the accuracy, completeness, currency or authenticity
              of any Site content, Site functionality, or your transmission of any Site content from the Site to you.
            </p>
            <p>
              Other World Wide Web sites that may be accessed from this Site by hypertext links are entirely independent
              of the Site. The inclusion of any site acknowledgments, identification of any person or entity in the Site,
              or any hypertext link to another person or entity shall not, in any manner, be construed as an endorsement
              of such person's or entity's World Wide Web site, products, services, or contributions to the Site. Any direction
              by a third party to this Site shall not, in any manner be construed as an endorsement by Hokela of such party’s
              World Wide Web site, products or services.
            </p>
            <p>
              All images are all rights reserved, and you must request permission from the copyright owner to use this material.
            </p>
          </div>
          <div className="terms__section">
            <h2>2. Use of this site</h2>

            <p>
              In order to provide reliability and trust to both volunteers and organizations, you must:
            </p>
            <ul>
              <li><span>Use the same name that you use in everyday life.</span></li>
              <li><span>Provide accurate information about yourself.</span></li>
            </ul>
            <p>
              We try to make Hokela broadly available to everyone, but you cannot use Hokela if:
            </p>
            <ul>
              <li><span>You are under 13 years old (or the minimum legal age in your country to possess the legal authority, right and freedom to enter into these Terms as a binding agreement).</span></li>
              <li><span>You are a convicted sex offender.</span></li>
              <li><span>We've previously disabled your account for violations of our Terms or Policies.</span></li>
              <li><span>You are prohibited from receiving our Services or software under applicable laws.</span></li>
            </ul>
          </div>
          <div className="terms__section">
            <h2>3. Limitations of liability</h2>

            <p>
              We work hard to provide the best Services we can and to specify clear guidelines for everyone who uses them. Our Site
              and Services, however, are provided “as is”, and we make no guarantees that they always will be safe, secure, or error-free,
              or that they will function without disruptions, delays, or imperfections. You agree that the use of Hokela is entirely at your
              risk. Neither Hokela, nor any of its affiliated companies, nor any officer, director, or employee thereof, nor any other
              person associated with the creation of the Site or its contents, shall be liable or responsible to any person for any harm,
              loss or damage that may arise in any connection with your use of the Site, including without limitation any direct, indirect,
              special, third party, or consequential damages. Without limiting the foregoing, Hokela shall not be responsible for any
              detrimental reliance that you may place upon the Site or its contents whatsoever.
            </p>
            <p>
              We do not control or direct what volunteers, organizations and other people do or say, and we are not responsible for their
              actions or conduct (whether online or offline) or any information they share (including offensive, inappropriate, obscene,
              unlawful, and other objectionable content). We cannot predict when issues might arise with our Site and Services. Accordingly,
              our liability shall be limited to the fullest extent permitted by applicable law, and under no circumstance will we be liable
              to you for any lost profits, revenues, information, or data, or consequential, special, indirect, exemplary, punitive, or
              incidental damages arising out of or related to these Terms or the Hokela Site and Services, even if we have been advised of
              the possibility of such damages.
            </p>
          </div>
          <div className="terms__section">
            <h2>4. Security</h2>

            <p>
              You acknowledge and confirm that the Internet is not a secure medium where privacy can be ensured, and that complete security and
              confidentiality over the Internet is not possible at this time. Your confidential use of the Site cannot be guaranteed and you
              acknowledge that your use of the Site (including information you transmit to the Site) may be subject to access by, or disclosure
              to, other persons. Without limiting any other disclaimer herein, Hokela shall not be responsible or liable for any harm that you
              or any other person may suffer in connection with any such breach of confidentiality or security.
            </p>
          </div>
          <div className="terms__section">
            <h2>5. Indemnification</h2>

            <p>
              You agree to indemnify and hold Hokela harmless from any demands, loss, liability, claims or expenses (including attorneys’ fees),
              made against them by any third party due to, or arising out of, or in connection with your use of the Site or any of the Services
              offered on the Site.
            </p>
          </div>
          <div className="terms__section">
            <h2>6. Intellectual property, copyrights and logos</h2>

            <p>
              The Service and all materials therein or transferred thereby, including, without limitation, software, images, text, graphics, logos,
              patents, trademarks, service marks, copyrights, photographs, audio, videos, music and all Intellectual Property Rights related thereto,
              are the exclusive property of Hokela unless otherwise specified in section “7. Credits” below. Except as explicitly provided herein,
              nothing in these Terms shall be deemed to create a license in or under any such Intellectual Property Rights, and you agree not to sell,
              license, rent, modify, distribute, copy, reproduce, transmit, publicly display, publicly perform, publish, adapt, edit or create
              derivative works thereof.
            </p>
          </div>
          <div className="terms__section">
            <h2>7. Credits</h2>

            <p>
              The Site was designed by Gabriela Nunez (Co-Founder, CTO and UX/UI Designer) in collaboration with Cindy Mena (UX/UI Designer), and fully
              developed by Conner MacKenna (Lead Full-Stack Software Engineer).
            </p>
            <p>
              The icons and illustrations used in this site were not designed by Hokela and Hokela does not take any credit for them. Instead, they
              were downloaded from the following websites:
            </p>

            <ul>
              <li><span><DocumentLink link="Flaticon" onClick={() => this.openLink('https://www.flaticon.com/')}/></span></li>
              <li><span><DocumentLink link="Icons8" onClick={() => this.openLink('https://icons8.com/')}/></span></li>
              <li><span><DocumentLink link="IcoFont" onClick={() => this.openLink('https://www.iconfont.cn/')}/></span></li>
              <li><span><DocumentLink link="DrawKit" onClick={() => this.openLink('https://www.drawkit.io/')}/></span></li>
            </ul>
          </div>
          <div className="terms__section">
            <h2>8. Promotional emails and content</h2>

            <p>
              You agree to receive from time to time promotional messages and materials from us, by mail, email or any other contact form you may
              provide us with (including your phone number for calls or text messages). If you don't want to receive such promotional materials or
              notices – please just notify us at any time.
            </p>
          </div>
          <div className="terms__section">
            <h2>9. Termination of services</h2>

            <p>
              We may, without prior notice, change the Services; stop providing the Services or any features of the Services we offer; or create
              limits for the Services. We may permanently or temporarily terminate or suspend access to the Services without notice and liability
              for any reason, or for no reason.
            </p>
          </div>
          <div className="terms__section">
            <h2>10. Updating our Terms</h2>

            <p>
              We reserve the right to modify these Terms from time to time at our sole discretion. Therefore, you should review these page periodically.
              When we change the Terms in a material manner, we will notify you that material changes have been made to the Terms. Your continued use
              of the Site or our Service after any such change constitutes your acceptance of the new Terms. If you do not agree to any of these terms
              or any future version of the Terms, do not use or access (or continue to access) the Site or the Service.
            </p>
          </div>
          <div className="terms__section">
            <h2>Contact us</h2>

            <p>
              We are here to help! For any questions, inquiries, clarification, or help regarding these Terms or our Site and Services, please do not 
              hesitate to <DocumentLink link="contact us" hideIcon onClick={this.handleContactUs}/>. 
            </p>
          </div>
          <div className="terms__section">
            <p>
              Date of last revision: July 17, 2021.
            </p>
          </div>
        </Page.Section>
      </Page>
    );
  }
}

export default withRouter(Terms);
