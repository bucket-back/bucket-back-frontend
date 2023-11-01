import { IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import CommonIcon from '../Icon';

interface CommonMenuProps {
  type: 'update' | 'logout' | 'create';
  onUpdate?: () => void;
  onDelete: () => void;
  onLogout?: () => void;
  onCreate?: () => void;
}

const CommonMenu = ({ type, onUpdate, onDelete, onLogout, onCreate }: CommonMenuProps) => {
  const handleUpdate = () => {
    onUpdate && onUpdate();
  };

  const handleLogout = () => {
    onLogout && onLogout();
  };

  const handleCreate = () => {
    onCreate && onCreate();
  };

  const menus = {
    update: (
      <>
        <MenuItem onClick={handleUpdate}>수정</MenuItem>
        <MenuDivider m="0" />
        <MenuItem onClick={onDelete}>삭제</MenuItem>
      </>
    ),
    logout: (
      <>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        <MenuDivider m="0" />
        <MenuItem onClick={onDelete}>탈퇴</MenuItem>
      </>
    ),
    create: (
      <>
        <MenuItem onClick={handleCreate}>생성</MenuItem>
        <MenuDivider m="0" />
        <MenuItem onClick={onDelete}>삭제</MenuItem>
      </>
    ),
  };

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={IconButton}
        display="flex"
        fontSize="1.25rem"
        icon={<CommonIcon type="ellipsis" />}
        variant="unstyled"
      />
      <MenuList p="0" minW="0" w="6rem">
        {menus[type]}
      </MenuList>
    </Menu>
  );
};

export default CommonMenu;
