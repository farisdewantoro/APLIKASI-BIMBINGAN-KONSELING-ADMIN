import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider   } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
const drawerWidth = 240;
const styles = theme =>({
    root: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1, //agar z index header lebih tinggi dari navbar
    },
    toolbar: theme.mixins.toolbar,
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
});

class Header extends React.Component{
    handleDrawerOpen = () => {
        this.setState({ open:!this.state.open });
    };
    state = {
        open: true,
    };
  render(){

      const { classes } = this.props;
  
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar} >
                <Toolbar >
                    <IconButton className={classes.menuButton} onClick={this.handleDrawerOpen} className={classNames(
                        classes.menuButton,
                        this.state.open && classes.menuButtonHidden,
                    )} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Bimbingan Konseling
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper,!this.state.open && classes.drawerPaperClose)
                }}
            >
                <div className={classes.toolbar} />
             <List component="nav">
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <Divider/>
             </List>
             <div/>
            </Drawer>
            <main className={classes.content}>
                
            </main>

        </div>
    );
            }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);