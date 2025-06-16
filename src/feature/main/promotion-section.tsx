import PromotionContent from './promotion-content';

function PromotionSection() {
  return (
    <section className="flex h-20 w-full flex-row items-center justify-center gap-20">
      <span className="content w-full border-b-2 text-white" />
      <div>
        <PromotionContent />
      </div>
      <span className="w-full border-b-2 text-white" />
    </section>
  );
}

export default PromotionSection;
