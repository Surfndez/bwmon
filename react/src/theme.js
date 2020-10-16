import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            sizeSmall: {
                padding: '8px 0px 8px 8px',
            },
        },
        MuiFormControl: {
            root: {
                margin: '8px 0px 8px 8px',
            },
        },
        MuiGrid: {
            item: {
                alignSelf: 'center',
            },
        },
    },
});

export default theme;
