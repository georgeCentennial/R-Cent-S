import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import unicornbikeImg from './../assets/images/unicornbikeImg.jpg';
import leafGreen from './../assets/images/leafGreen.jpg'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
    },
    title: {
        padding: theme.spacing(3, 2.5, 2),
        color: theme.palette.openTitle,
    },
    media: {
        minHeight: 400,
    },
}));
export default function Home(){     
    const classes = useStyles()
    return (
        // <Card className={classes.card}>

        // <Typography variant="h6" className={classes.title}>Home Page</Typography>
        // <CardMedia className={classes.media} />
        // <CardContent>
        // <Typography variant="body2" component="p"> 
        //     Welcome to R-Cent-S home page.
        // </Typography> 
        // </CardContent>
        // </Card> 
        <>
            <Box component="section" sx={{ p: 15, border: '1px dashed grey' }}>
                <Button sx={{ bgcolor: 'primary.main'}} variant="outlined">Sign In</Button>
                <Button sx={{ bgcolor: 'primary.main'}} variant="outlined">Sign Up</Button>
            </Box>
            
        </>
    )
}

