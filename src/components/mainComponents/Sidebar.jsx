import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import { useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import {LibraryBooks, FolderTwoTone, CorporateFare, BarChart, ShoppingCart} from "@mui/icons-material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GavelIcon from "@mui/icons-material/Gavel";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {useAuth} from "../../context/AuthContext";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [department, setDepartment] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);
  const [showPaymentsMenu, setShowPaymentsMenu] = useState(false);
  const [showLoanOptions, setShowLoanOptions] = useState(false);
  const [showExchangeMenu, setShowExchangeMenu] = useState(false);
  const [showOtcMenu, setShowOtcMenu] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (userInfo) {
      setPosition(userInfo.position || "NONE");
      setDepartment(userInfo.department || null);
      setIsAdmin(userInfo.isAdmin || false);
      setIsEmployed(userInfo.isEmployed || false);
    }
  }, [userInfo]);

  // Function to open/close the sidebar
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Function to navigate to the selected page
  const handleNavigation = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[{ mr: 2 }, open && { display: "none" }]}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}></Box>
            <LogoutButton />
          </Toolbar>
        </AppBar>

        <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>

            {/* Customer Routes */}
            {position === "NONE" && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/customer-home')}>
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/accounts-portal')}>
                      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                      <ListItemText primary="Accounts" />
                    </ListItemButton>
                  </ListItem>

                  {/* Payments Dropdown */}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setShowPaymentsMenu(!showPaymentsMenu)}>
                      <ListItemIcon><PaymentIcon /></ListItemIcon>
                      <ListItemText primary="Payments" />
                      {showPaymentsMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={showPaymentsMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/new-payment-portal')}>
                        <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                        <ListItemText primary="New Payment" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/internal-transfer-portal')}>
                        <ListItemIcon><TransferWithinAStationIcon /></ListItemIcon>
                        <ListItemText primary="Transfer" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/receiver-portal')}>
                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                        <ListItemText primary="Payment Receivers" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/transactions-page')}>
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText primary="Payment Overview" />
                      </ListItemButton>
                    </List>
                  </Collapse>

                  {/* Exchange Dropdown */}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setShowExchangeMenu(!showExchangeMenu)}>
                      <ListItemIcon><CurrencyExchangeIcon /></ListItemIcon>
                      <ListItemText primary="Exchange" />
                      {showExchangeMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={showExchangeMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/exchange-rates')}>
                        <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                        <ListItemText primary="Exchange Rates" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/currency-converter')}>
                        <ListItemIcon><CompareArrowsIcon /></ListItemIcon>
                        <ListItemText primary="Currency Converter" />
                      </ListItemButton>
                    </List>
                  </Collapse>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/cards-portal')}>
                      <ListItemIcon><CreditCardIcon /></ListItemIcon>
                      <ListItemText primary="Cards" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/loans-portal')}>
                      <ListItemIcon><CurrencyExchangeIcon /></ListItemIcon>
                      <ListItemText primary="Loans" />
                    </ListItemButton>
                  </ListItem>

                  {/* For Customers with Trade Permission  LATER*/}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/client-buying-portal')}>
                      <ListItemIcon><FolderTwoTone /></ListItemIcon>
                      <ListItemText primary="Securities Buying Portal" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/portfolio-page')}>
                      <ListItemIcon><LibraryBooks /></ListItemIcon>
                      <ListItemText primary="Portfolio" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setShowOtcMenu(!showOtcMenu)}>
                      <ListItemIcon><RequestQuoteIcon /></ListItemIcon>
                      <ListItemText primary="OTC" />
                      {showOtcMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={showOtcMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/otc-trading-portal')}>
                        <ListItemIcon><ShoppingCart /></ListItemIcon>
                        <ListItemText primary="OTC Trading" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/otc-active-offers')}>
                        <ListItemIcon><GavelIcon /></ListItemIcon>
                        <ListItemText primary="OTC Active Offers" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/otc-contracts')}>
                        <ListItemIcon><HandshakeIcon /></ListItemIcon>
                        <ListItemText primary="OTC Contracts" />
                      </ListItemButton>
                    </List>
                  </Collapse>

                  {/*DO OVDE*/}
                </>
            )}

            {/* Supervisor only */}
            {isEmployed && department === "SUPERVISOR" && (
                <>
                  <ListItemButton onClick={() => handleNavigation("/employee-home")}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/agent-management-portal')}>
                      <ListItemIcon><CompareArrowsIcon /></ListItemIcon>
                      <ListItemText primary="Agent Management" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/actuarial-performance-portal')}>
                      <ListItemIcon><PriceCheckIcon /></ListItemIcon>
                      <ListItemText primary="Actuarial Performance" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/portfolio-page')}>
                      <ListItemIcon><LibraryBooks /></ListItemIcon>
                      <ListItemText primary="Portfolio" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/actuary-buying-portal')}>
                      <ListItemIcon><FolderTwoTone /></ListItemIcon>
                      <ListItemText primary="Securities Buying Portal" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/view-order-portal')}>
                      <ListItemIcon><ShoppingCart /></ListItemIcon>
                      <ListItemText primary="Orders" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/tax-tracking-portal')}>
                      <ListItemIcon><BarChart /></ListItemIcon>
                      <ListItemText primary="Tax Tracking" />
                    </ListItemButton>
                  </ListItem>
                </>
            )}

            {/* Agent only */}
            {isEmployed && department === "AGENT" && (
                <>
                  <ListItemButton onClick={() => handleNavigation("/employee-home")}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/portfolio-page')}>
                      <ListItemIcon><LibraryBooks /></ListItemIcon>
                      <ListItemText primary="Portfolio" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/actuary-buying-portal')}>
                      <ListItemIcon><FolderTwoTone /></ListItemIcon>
                      <ListItemText primary="Important Files" />
                    </ListItemButton>
                  </ListItem>
                </>
            )}

            {/* Employee & Admin Routes */}
            {isEmployed && department !== "AGENT" && department !== "SUPERVISOR" && (
                <>
                  <ListItemButton onClick={() => handleNavigation("/employee-home")}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleNavigation("/customer-portal")}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Customers" />
                  </ListItemButton>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNavigation('/employee-bank-accounts-portal')}>
                      <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                      <ListItemText primary="Employee Bank Accounts" />
                    </ListItemButton>
                  </ListItem>

                  {/* Loans Dropdown */}
                  <ListItemButton onClick={() => setShowLoanOptions(!showLoanOptions)}>
                    <ListItemIcon><PaymentIcon /></ListItemIcon>
                    <ListItemText primary="Loans" />
                    {showLoanOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                  <Collapse in={showLoanOptions} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/all-loans-employee")}>
                        <ListItemIcon><ReceiptIcon /></ListItemIcon>
                        <ListItemText primary="All Loans" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation("/pending-loans-employee")}>
                        <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                        <ListItemText primary="Pending Loans" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={() => handleNavigation("/companies-portal")}>
                    <ListItemIcon><CorporateFare /></ListItemIcon>
                    <ListItemText primary="Companies" />
                  </ListItemButton>
                </>
            )}

            {/* Admin-Only Route */}
            {isAdmin && (
                <>
                <ListItemButton onClick={() => handleNavigation("/employee-portal")}>
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary="Employees" />
                </ListItemButton>
                  <ListItemButton onClick={() => handleNavigation("/bank-performance-portal")}>
                    <ListItemIcon><LocalAtmIcon /></ListItemIcon>
                    <ListItemText primary="Bank Performance" />
                  </ListItemButton>
                </>
            )}

          </List>
          <Divider />
        </Drawer>
      </Box>
  );
}
