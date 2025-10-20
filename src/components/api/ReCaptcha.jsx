import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Recaptcha({ onChange }) {
  const recaptchaRef = useRef(null);

  return (
    <ReCAPTCHA
      sitekey="6Lc4UPArAAAAABbDqu7ecWIfeTKE5bbuhfs0Px4_"
      onChange={onChange}
      ref={recaptchaRef}
    />
  );
}
