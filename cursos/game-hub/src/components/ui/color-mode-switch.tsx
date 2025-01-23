import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
      ></Switch>
      <Text whiteSpace={'nowrap'}>
        {colorMode === 'dark' ? 'Dark' : 'Light'}
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
