import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

interface CommonSliderProps {
  onChange: (value: number) => void;
}

const CommonSlider = ({ onChange }: CommonSliderProps) => {
  return (
    <Slider defaultValue={2.5} min={0} max={5} step={0.5} onChange={(value) => onChange(value)}>
      <SliderTrack>
        <SliderFilledTrack bg="blue.300" />
      </SliderTrack>
      <SliderThumb boxSize={5} />
    </Slider>
  );
};

export default CommonSlider;
