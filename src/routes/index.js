import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';
import DefaultProps from '../constants/navigation';

import { UsersList, UsersSingle, ReposList } from '../containers';

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="usersList"
          hideNavBar
          title="Find Users in Github"
          icon={() => <Icon type="FontAwesome5" name="user" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="usersList" component={UsersList} />
          <Scene key="usersSingle" component={UsersSingle} />
        </Stack>

        <Stack
          key="reposList"
          hideNavBar
          title="Find Repositories in Github"
          icon={() => <Icon type="FontAwesome" name="code" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="reposList" component={ReposList} />
        </Stack>
      </Tabs>
    </Scene>
  </Stack>
);

export default Index;
