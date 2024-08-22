export interface Props {
  rating?: number;
  maxRating: number;
}

export default function Rating(props: Props) {
  const { rating, maxRating } = props;
  const stars = Array.from({ length: maxRating }, (_, index) => index + 1);

  return (
    <div className="rating rating-sm flex gap-2 justify-center w-[185px] mt-3">
      <input type="radio" name="rating-1" class="rating-hidden checked" />

      {stars.map((_star, idx) => {
        return (
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 checked:bg-primary bg-accent border-1 border-primary"
            checked={idx + 1 === rating}
          />
        );
      })}
    </div>
  );
}
