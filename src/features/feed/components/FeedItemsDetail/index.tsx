import styled from '@emotion/styled';
import { CommonButton, CommonImage } from '@/shared/components';
import { FeedItemInfo } from '@/shared/types';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
