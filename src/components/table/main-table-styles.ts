
const commomBorderColor: string = 'rgba(194, 201, 209, .25)';
const styles = {
  tableWrapper: {
    style: {
      borderBottom: 'none',
      borderRadius: '8px 8px 0 0'
    },
  },
  headRow: {
    style: {
      backgroundColor: '#f0f2f4',
      borderColor: commomBorderColor,
      minHeight: 0,
    },
  },
  headCells: {
    style: {
      color: '#333333',
      fontSize: '14px',
      fontFamily: 'Open Sans',
      fontWeight: 'bold',
      paddingBottom: '20px',
      paddingTop: '20px',
    },
  },
  rows: {
    style: {
      color: '#333333',
      borderBottom: `1px solid ${commomBorderColor} !important`,
      fontSize: '14px'
    },
  },
  cells: {
    style: {
      padding: '0 20px',
    },
  },
  pagination: {
    style: {
      borderTop: 'none',
      color: 'rgba(0, 0, 0, .5)',
      marginTop: '25px',
      '& > div:nth-child(2)': {
        marginRight: 'auto',
      },
    },
  },
};

export default styles;
