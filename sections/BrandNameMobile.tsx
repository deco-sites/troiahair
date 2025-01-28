interface Props {
  /**
   * @description Nome da marca.
   */
  name?: string;
}

export default function Section({ name = "Capy" }: Props) {
  return (
    <div class="mt-12 mb-4 text-center uppercase text-xl font-semibold text-primary ">
      {name}
    </div>
  );
}
