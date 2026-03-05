import type { PageType } from '~/popup/PopupPage'
import { Button } from '@web-archive/shared/components/button'
import { Input } from '@web-archive/shared/components/input'
import { Label } from '@web-archive/shared/components/label'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { sendMessage } from 'webext-bridge/popup'
import { useServerUrl, useToken } from '~/popup/composable/server'

function LoginPage({ setActivePage }: { setActivePage: (tab: PageType) => void }) {
  const { t } = useTranslation()
  const [serverUrl, saveServerUrl] = useServerUrl()
  const [token, saveToken] = useToken()

  function checkAuth() {
    sendMessage('login', {}).then(({ success }) => {
      if (success) {
        setActivePage('home')
      }
      else {
        toast.error(t('auth-failed'))
      }
    })
  }

  return (
    <div className="w-80 space-y-3 p-4 ">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="serverUrl">{t('server-url')}</Label>
        <Input
          id="serverUrl"
          placeholder={t('input-server-url-placeholder')}
          value={serverUrl}
          onChange={saveServerUrl}
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="token">Token</Label>
        <Input
          id="token"
          placeholder={t('input-token-placeholder')}
          type="password"
          value={token}
          onChange={saveToken}
        />
      </div>

      <Button
        className="w-full"
        onClick={checkAuth}
      >
        {t('save')}
      </Button>
    </div>
  )
}

export default LoginPage
