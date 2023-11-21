import { CommonButton, CommonImage } from '@/shared/components';
import { FeedItemInfo } from '@/shared/types';
import { ButtonBox, Container, ContentsWrapper } from './style';

interface FeedItemsDetailProps {
  items?: FeedItemInfo[];
  onClick?: () => void;
}

const FeedItemsDetail = ({ items, onClick }: FeedItemsDetailProps) => {
  return (
    <Container>
      {items &&
        items.map(({ id, name, image }) => (
          <ContentsWrapper key={id}>
            <ButtonBox>
              <CommonImage size="xs" src={image} />
              <CommonButton type="xs" onClick={onClick}>
                {name}
              </CommonButton>
            </ButtonBox>
            <CommonImage size="lg" src={image} onClick={onClick} />
          </ContentsWrapper>
        ))}
    </Container>
  );
};

export default FeedItemsDetail;
