import { useParams } from 'react-router-dom';

const MemberHome = () => {
  const { memberId } = useParams();

  return <>{memberId}</>;
};

export default MemberHome;
