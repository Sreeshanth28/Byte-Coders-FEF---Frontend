import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Stack, Card, Avatar, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function UserDetailPage() {
  const { name } = useParams();
  const bnplId = Number(name); // Convert name to number since BNPLID is a number
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bnplTransactions, setBnplTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/getcustomerdetailsbybnplid/?bnplId=${bnplId}`);
        const data = await response.json();
        setSelectedUser(data.customerInfo);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBNPLTransactions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/gettransactiondetails/?bnplId=${bnplId}`);
        const data = await response.json();
        setBnplTransactions(data.allTransactions);
      } catch (error) {
        console.error('Error fetching BNPL transactions:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/getcustomerhistory/?bnplId=${bnplId}`);
        const data = await response.json();
        setTransactions(data.transactionHistory.history);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchUserData();
    fetchBNPLTransactions();
    fetchTransactions();
  }, [bnplId]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setPage(0); // Reset pagination when changing tabs
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset pagination when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBNPLTransactions = bnplTransactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.transactionDate.includes(searchTerm) ||
    transaction.amount.includes(searchTerm) ||
    transaction.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.dueDate.includes(searchTerm) ||
    transaction.amountToPay.includes(searchTerm)
  );

  if (!selectedUser) {
    return (
      <Container>
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="user detail tabs">
        <Tab label="BNPL Customer Details" />
        <Tab label="BNPL Transactions" />
        <Tab label="User Transactions" />
      </Tabs>
      <Box mt={2}>
        {tabIndex === 0 && (
          <Card>
            <Stack direction="row" spacing={2} alignItems="center" p={2}>
              <Avatar alt={selectedUser.name} src={selectedUser.avatarUrl} />
              <Typography variant="h6">{selectedUser.name}</Typography>
            </Stack>
            <Typography variant="body1" p={2}>
              <strong>BNPLID:</strong> {selectedUser.bnplId}
            </Typography>
            <Typography variant="body1" p={2}>
              <strong>Company:</strong> {selectedUser.orgId}
            </Typography>
            <Typography variant="body1" p={2}>
              <strong>BNPL Limit:</strong> {selectedUser.bnplLimit}
            </Typography>
            <Typography variant="body1" p={2}>
              <strong>DueAmount:</strong> Active
            </Typography>
          </Card>
        )}
        {tabIndex === 1 && (
          <Card>
            <Typography variant="h6" p={2}>BNPL Transactions</Typography>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <TableContainer>
              <Table className={classes.table} aria-label="BNPL Transactions table">
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>DueAmount</TableCell>
                    <TableCell>SalaryCut</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBNPLTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
                    <TableRow key={transaction.transactionId}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.transactionDate}</TableCell>
                      <TableCell>{Number(transaction.amount).toFixed(2)}</TableCell>
                      <TableCell>{Number(transaction.amountLeft).toFixed(2)}</TableCell>
                      <TableCell>{transaction.salaryCut} %</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBNPLTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
        {tabIndex === 2 && (
          <Card>
            <Typography variant="h6" p={2}>User Transactions</Typography>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <TableContainer>
              <Table className={classes.table} aria-label="User Transactions table">
                <TableHead>
                  <TableRow>
                    <TableCell>Loan for</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
                    <TableRow key={transaction.installmentId}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.dueDate}</TableCell>
                      <TableCell>
                        {transaction.message === 'Interest' ? Number(transaction.interest).toFixed(2) : Number(transaction.amountToPay).toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredTransactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default UserDetailPage;
