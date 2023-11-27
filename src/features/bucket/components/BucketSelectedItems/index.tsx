import { CommonButton, CommonImage } from '@/shared/components';
import { Container } from './style';

interface SelectedItem {
  id: number;
  image: string;
}

interface BucketSelectedItemsProps {
  items: SelectedItem[];
}

const BucketSelectedItems = ({ items }: BucketSelectedItemsProps) => {
  return (
    <Container>
      {items.length > 0 ? (
        items.map((item) => <CommonImage key={item.id} size="sm" src={item.image} />)
      ) : (
        <CommonButton type="custom" />
      )}
    </Container>
  );
};

export default BucketSelectedItems;
