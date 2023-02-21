import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../pages/Home'
import Profile from '../pages/Profile';
import New from '../pages/New';

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#FFF',
              width: 240,
            },            
            drawerHideStatusBarOnOpen: true,
            // drawerContentOptions: {
            //     activeTintColor: '#FFF',  
            //     labelStyle: {
            //         fontWeight: 'bold'
            //     },      
            //     labelStyle: {
            //         fontWeight: 'bold'
            //     },
            //     activeTintColor: '#FFF',
            //     activeBackgroundColor: '#00b94a',
            //     inactiveBackgroundColor: '#000',
            //     inactiveTintColor: '#DDD',
            //     itemStyle: {
            //         marginVertical: 5,
            //     }        
            // }
          }}          
        //   contentOptions={{
        //     labelStyle: {
        //         fontWeight: 'bold'
        //     },
        //     activeTintColor: '#FFF',
        //     activeBackgroundColor: '#00b94a',
        //     inactiveBackgroundColor: '#000',
        //     inactiveTintColor: '#DDD',
        //     itemStyle: {
        //         marginVertical: 5,
        //     }
        //   }}
        >
            <AppDrawer.Screen name="Home" component={Home} options={{ drawerLabel: 'Home' }} />
            <AppDrawer.Screen name="Registrar" component={New} options={{ drawerLabel: 'Registrar' }}/>
            <AppDrawer.Screen name="Perfil" component={Profile} options={{ drawerLabel: 'Profile' }} />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;