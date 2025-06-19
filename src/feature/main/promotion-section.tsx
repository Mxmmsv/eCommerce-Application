import PromotionContent from './promotion-content';

function PromotionSection() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-20 py-20 md:flex-row">
      <span className="hidden w-full border-b-2 text-white md:block" />
      <div>
        <PromotionContent />
      </div>
      <span className="hidden w-full border-b-2 text-white md:block" />
    </section>
  );
}

export default PromotionSection;
