import { useNavigate } from 'react-router-dom';
import { CommonButton, CommonImage } from '@/shared/components';
import { FeedItemInfo } from '@/shared/types';
import { ellipsisName } from '@/shared/utils';
import { ButtonBox, Container, ContentsWrapper } from './style';

interface FeedItemsDetailProps {
  items?: FeedItemInfo[];
}

const FeedItemsDetail = ({ items }: FeedItemsDetailProps) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  return (
    <Container>
      {items &&
        items.map(({ id, name, image }) => (
          <ContentsWrapper key={id}>
            <ButtonBox>
              <CommonImage size="xs" src={image} />
              <CommonButton type="xs" onClick={() => handleClick(id)}>
                {ellipsisName(name, 25)}
              </CommonButton>
            </ButtonBox>
            <CommonImage size="lg" src={image} onClick={() => handleClick(id)} />
          </ContentsWrapper>
        ))}
    </Container>
  );
};

export default FeedItemsDetail;
