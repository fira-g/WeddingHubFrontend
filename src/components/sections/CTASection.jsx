import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="px-6 pb-12">
      <p className="font-sans text-gold-400 text-[11px] tracking-[4px] uppercase text-center mb-5">
        Join the celebration
      </p>
      <button
        className="btn-primary w-full mb-3"
        onClick={() => {
          navigate("/gallery");
          window.scroll(0, 0);
        }}
      >
        View Gallery
      </button>
      <div className="flex gap-3">
        <button
          className="btn-outline flex-1"
          onClick={() => {
            navigate("/memories");
            window.scroll(0, 0);
          }}
        >
          Upload Memory
        </button>
        <button
          className="btn-outline flex-1"
          onClick={() => {
            navigate("/wishes");
            window.scroll(0, 0);
          }}
        >
          Share Wishes
        </button>
      </div>
    </section>
  );
}
