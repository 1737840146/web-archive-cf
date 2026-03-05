import { useEffect, useState } from 'react'

import { Toaster } from 'react-hot-toast'
import { sendMessage } from 'webext-bridge/popup'
import LoadingPage from '~/popup/components/LoadingPage'
import LoginPage from '~/popup/components/LoginPage'
import PluginHomePage from '~/popup/components/PluginHomePage'
import SettingPage from '~/popup/components/SettingPage'
import UploadPageForm from '~/popup/components/UploadPageForm'
import HistoryTaskList from './components/HistoryTaskList'

export type PageType = 'home' | 'login' | 'loading' | 'upload' | 'setting' | 'history' | 'empty'

function PopupContainer() {
  const [activeTab, setActivePage] = useState<PageType>('empty')

  useEffect(() => {
    sendMessage('check-auth', {}).then(({ success }) => {
      setActivePage(success ? 'home' : 'login')
    })
  }, [])

  const tabs = {
    home: <PluginHomePage setActivePage={setActivePage} />,
    login: <LoginPage setActivePage={setActivePage} />,
    loading: <LoadingPage loadingText="Loading..."></LoadingPage>,
    upload: <UploadPageForm setActivePage={setActivePage} />,
    setting: <SettingPage setActivePage={setActivePage} />,
    history: <HistoryTaskList setActivePage={setActivePage}></HistoryTaskList>,
    empty: <div></div>,
  }

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      >
      </Toaster>
      {tabs[activeTab]}
    </div>
  )
}

export default PopupContainer
