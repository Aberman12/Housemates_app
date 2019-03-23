import React from 'react';
import { Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmailSignUp from './components/SignInEmail';
import FirebaseAuth from './components/FirebasePhoneAuth';
import CreateAccount from './components/CreateUserAccount';
import Chores from './components/Chores';
import HouseSignup from './components/HouseSignup';
import JoinHouse from './components/JoinHouse';
import CreateHouse from './components/CreateHouse';
// import Calendar from "./components/Calendar";
import Agenda from './components/CalendarAgenda';
import List from './components/ListComponent';
import Profile from './components/Profile1/';

const TabIcon = ({ selected, title }) => {
  return (
    <Text
      style={{
        fontSize: 20,
        color: selected ? 'red' : 'black'
      }}
    >
      {title}{' '}
    </Text>
  );
};

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Welcome to Housemates" />
        <Scene key="emailSignUp" component={EmailSignUp} title="Sign Up Using Email" />
        <Scene key="createAccount" component={CreateAccount} title="Create Account" />
        <Scene
          key="HouseSignup"
          component={HouseSignup}
          title="Join a House"
          // initial
        />
        <Scene key="JoinHouse" component={JoinHouse} title="Sign Up Using Email" />
        <Scene key="CreateHouse" component={CreateHouse} title="Create a House" />
        <Scene key="FirebaseAuth" component={FirebaseAuth} title="Confirm Phone Number" />
      </Scene>

      <Scene
        key="main"
        tabs={true}
        height={60}
        tabBarStyle={{
          backgroundColor: '#F9F9F9',
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#D3D3D3'
        }}
      >
        <Scene key="osu" title="RT" icon={TabIcon}>
          <Scene
            onRight={() => Actions.employeeCreate()}
            rightTitle="Settings"
            key="employeeList"
            component={List}
            title="Expenses"
            initial
          />
        </Scene>
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Settings"
          key="tab2"
          component={Profile}
          title="Chores"
          icon={TabIcon}
        />
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Settings"
          key="tab3"
          component={List}
          title="Groceries"
          icon={TabIcon}
        />
        <Scene
          // onRight={() => Actions.employeeCreate()}
          // rightTitle="Settings"
          key="tab4"
          component={Agenda}
          title="Calendar"
          icon={TabIcon}
        />
      </Scene>
      {/* </Scene> */}
    </Router>
  );
};

export default RouterComponent;

{
  /* <Scene key='tab1' title='Add' component={Lists} icon={TabIcon}/>
<Scene key='tab2' title='Grocery' component={G} icon={TabIcon}/>
<Scene key='tab3' hideNavBar title='To Do' component={T} icon={TabIcon}/> */
}
