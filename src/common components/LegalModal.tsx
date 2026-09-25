import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";

import "./legalModal.css";

export type LegalTab = "terms" | "privacy";

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
  onAccept: () => void;
  onClose: () => void;
}

const LegalModal = ({
  isOpen,
  activeTab,
  onTabChange,
  onAccept,
  onClose,
}: LegalModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="legal-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="legal-modal">
        {/* Header */}
        <div className="legal-modal-header">
          <div className="legal-modal-title">
            <div className="legal-title-icon">
              {activeTab === "terms" ? (
                <GavelOutlinedIcon />
              ) : (
                <PrivacyTipOutlinedIcon />
              )}
            </div>

            <div>
              <h2>
                {activeTab === "terms"
                  ? "Terms & Conditions"
                  : "Privacy Policy"}
              </h2>

              <p>Laboratory Management System</p>
            </div>
          </div>

          <button
            type="button"
            className="legal-close-button"
            onClick={onClose}
            aria-label="Close legal information"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="legal-tabs">
          <button
            type="button"
            className={`legal-tab ${
              activeTab === "terms" ? "legal-tab-active" : ""
            }`}
            onClick={() => onTabChange("terms")}
          >
            <GavelOutlinedIcon />
            <span>Terms & Conditions</span>
          </button>

          <button
            type="button"
            className={`legal-tab ${
              activeTab === "privacy" ? "legal-tab-active" : ""
            }`}
            onClick={() => onTabChange("privacy")}
          >
            <PrivacyTipOutlinedIcon />
            <span>Privacy Policy</span>
          </button>
        </div>

        {/* Content */}
        <div className="legal-modal-content">
          {activeTab === "terms" ? (
            <TermsContent />
          ) : (
            <PrivacyContent />
          )}
        </div>

        {/* Footer */}
        <div className="legal-modal-footer">
          <div className="legal-footer-note">
            <CheckCircleIcon />

            <span>
              Please review the information before continuing.
            </span>
          </div>

          <button
            type="button"
            className="legal-accept-button"
            onClick={onAccept}
          >
            <CheckCircleIcon />
            <span>I Understand & Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   TERMS & CONDITIONS
========================================= */

const TermsContent = () => {
  return (
    <article className="legal-document">
      <div className="legal-document-intro">
        <span className="legal-document-label">
          SOFTWARE TERMS & CONDITIONS
        </span>

        <h3>Laboratory Management System</h3>

        <p className="legal-updated">
          Last Updated: September 2026
        </p>

        <p>
          These Terms & Conditions govern your use of the Laboratory
          Management System software and related services. By creating
          an account or using the software, you agree to comply with
          these terms.
        </p>
      </div>

      <section>
        <h4>1. Acceptance of Terms</h4>

        <p>
          By registering for or accessing the Laboratory Management
          System, you confirm that you have the authority to represent
          the laboratory or organization associated with the account.
          If you do not agree with these terms, you should not use the
          software.
        </p>
      </section>

      <section>
        <h4>2. Account Registration</h4>

        <p>
          You are responsible for providing accurate and complete
          information during registration. The laboratory administrator
          is responsible for maintaining the accuracy of laboratory and
          administrator information.
        </p>
      </section>

      <section>
        <h4>3. Account Security</h4>

        <p>
          Account credentials must be kept confidential. Users are
          responsible for activity performed through their accounts and
          should notify the appropriate administrator if unauthorized
          access is suspected.
        </p>
      </section>

      <section>
        <h4>4. Authorized Use</h4>

        <p>
          The software is intended for legitimate laboratory management
          activities, including patient management, sample processing,
          test management, result management, reporting, billing and
          related administrative operations.
        </p>
      </section>

      <section>
        <h4>5. Patient & Laboratory Data</h4>

        <p>
          The laboratory is responsible for ensuring that information
          entered into the system is accurate and that its users have
          appropriate authorization to access patient and laboratory
          information.
        </p>
      </section>

      <section>
        <h4>6. Role-Based Access</h4>

        <p>
          Access to software functionality may depend on the role and
          permissions assigned to each user. Administrators are
          responsible for assigning appropriate access to their
          laboratory staff.
        </p>
      </section>

      <section>
        <h4>7. System Availability</h4>

        <p>
          Reasonable efforts may be taken to maintain availability and
          reliability of the software. Maintenance, updates,
          infrastructure issues or circumstances outside reasonable
          control may temporarily affect availability.
        </p>
      </section>

      <section>
        <h4>8. Prohibited Activities</h4>

        <p>
          Users must not misuse the software, attempt unauthorized
          access, interfere with system security, introduce malicious
          software, or use the platform for unlawful purposes.
        </p>
      </section>

      <section>
        <h4>9. Intellectual Property</h4>

        <p>
          The software, interface, design, documentation and related
          intellectual property remain subject to the rights of their
          respective owners. Users receive only the rights necessary
          to use the software for authorized purposes.
        </p>
      </section>

      <section>
        <h4>10. Changes to These Terms</h4>

        <p>
          These Terms & Conditions may be updated from time to time.
          Updated terms will be made available through the software or
          other appropriate communication channels.
        </p>
      </section>

      <section>
        <h4>11. Termination</h4>

        <p>
          Access may be suspended or terminated when an account
          violates these terms, creates a security risk, or is otherwise
          used in a manner that is not authorized.
        </p>
      </section>

      <section>
        <h4>12. Contact</h4>

        <p>
          For questions regarding these terms, contact your
          organization's designated software administrator or the
          software service provider.
        </p>
      </section>
    </article>
  );
};

/* =========================================
   PRIVACY POLICY
========================================= */

const PrivacyContent = () => {
  return (
    <article className="legal-document">
      <div className="legal-document-intro">
        <span className="legal-document-label">
          SOFTWARE PRIVACY POLICY
        </span>

        <h3>Laboratory Management System</h3>

        <p className="legal-updated">
          Last Updated: September 2026
        </p>

        <p>
          This Privacy Policy explains how information may be
          collected, used, stored and protected when the Laboratory
          Management System is used by a laboratory or organization.
        </p>
      </div>

      <section>
        <h4>1. Information We Collect</h4>

        <p>
          Depending on the features used, the system may process
          laboratory information, administrator details, staff account
          information, patient information, test information, sample
          information, results, billing information and system activity
          records.
        </p>
      </section>

      <section>
        <h4>2. Use of Information</h4>

        <p>
          Information may be used to provide laboratory management
          functionality, process tests and samples, generate reports,
          manage accounts, support billing activities, maintain system
          security and improve the operation of the software.
        </p>
      </section>

      <section>
        <h4>3. Patient Information</h4>

        <p>
          Patient information should only be entered and accessed by
          authorized personnel for legitimate laboratory or healthcare
          related purposes. Laboratories are responsible for ensuring
          appropriate authorization and lawful processing of patient
          information.
        </p>
      </section>

      <section>
        <h4>4. Data Security</h4>

        <p>
          Appropriate technical and organizational measures should be
          used to protect information against unauthorized access,
          alteration, disclosure, loss or destruction. Access controls
          may be applied according to user roles and permissions.
        </p>
      </section>

      <section>
        <h4>5. Data Retention</h4>

        <p>
          Information may be retained for as long as necessary to
          provide the service, meet contractual requirements, support
          legitimate business operations, or comply with applicable
          legal and regulatory requirements.
        </p>
      </section>

      <section>
        <h4>6. Access & Permissions</h4>

        <p>
          Users may only access information and functionality permitted
          by their assigned role. Laboratory administrators are
          responsible for managing user access within their
          organization.
        </p>
      </section>

      <section>
        <h4>7. Service Providers</h4>

        <p>
          Where necessary to operate the software, information may be
          processed by infrastructure, hosting, communication or other
          service providers working on behalf of the software provider,
          subject to appropriate safeguards.
        </p>
      </section>

      <section>
        <h4>8. Cookies & Local Storage</h4>

        <p>
          The application may use browser storage or similar
          technologies for authentication, preferences, session
          management and other essential application functionality.
        </p>
      </section>

      <section>
        <h4>9. Privacy Rights</h4>

        <p>
          Depending on applicable law, individuals may have rights
          relating to access, correction, deletion, restriction or other
          processing of their personal information. Requests should be
          directed to the appropriate laboratory or service provider.
        </p>
      </section>

      <section>
        <h4>10. Policy Updates</h4>

        <p>
          This Privacy Policy may be updated periodically to reflect
          changes in the software, legal requirements or privacy
          practices. The latest version will be made available through
          the application.
        </p>
      </section>

      <section>
        <h4>11. Contact</h4>

        <p>
          For privacy-related questions or requests, contact your
          organization's designated administrator or the software
          service provider.
        </p>
      </section>
    </article>
  );
};

export default LegalModal;