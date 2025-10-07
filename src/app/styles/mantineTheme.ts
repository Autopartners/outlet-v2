import { createTheme } from '@mantine/core';

const mantineTheme = createTheme({
  cursorType: 'pointer',
  components: {
    Button: { defaultProps: { radius: 'md' } },
    Alert: { defaultProps: { radius: 'lg' } },
    ActionIcon: { defaultProps: { radius: 'md' } },
    Menu: { defaultProps: { radius: 'md' } },
    Popover: { defaultProps: { radius: 'md' } },
    Card: { defaultProps: { shadow: 'sm', radius: 'md' } },
    TextInput: { defaultProps: { radius: 'md' } },
    NumberInput: { defaultProps: { radius: 'md' } },
    InputBase: { defaultProps: { radius: 'md' } },
    PasswordInput: { defaultProps: { radius: 'md' } },
    Select: { defaultProps: { radius: 'md' } },
    MultiSelect: { defaultProps: { radius: 'md' } },
    Checkbox: { defaultProps: { radius: 'md' } },
    Combobox: { defaultProps: { radius: 'md' } },
    Modal: { defaultProps: { radius: 'lg' } }
  }
});

export default mantineTheme;
