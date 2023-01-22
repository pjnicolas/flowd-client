import { useState } from 'react'
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5'
import { createTask, startTask, stopTask, useTaskList } from './api/task'
import Button from './components/Button'
import Form from './components/Form'
import Input from './components/Input'
import { YupRequiredString } from './components/lib/yup'
import { toastError, toastSuccess } from './components/lib/toast'
import Card from './components/Card'
import './App.css'

const App = () => {
  const [tasks,, reloadTasks] = useTaskList()
  const [name, setName] = useState<string | null>(null)

  if (!tasks) {
    // TODO: spinner
    return <div>Loading...</div>
  }

  return (
    <div className='m-4'>
      <Card className="gap-4">
        {tasks.map((task) => (
          <div key={task.id} className='flex gap-4 items-center'>
            <Button
              danger={ !!task.start }
              text
              icon={ task.start ? <IoPauseSharp /> : <IoPlaySharp /> }
              onClick={() => {
                if (task.start) {
                  stopTask(task.id)
                    .then(() => {
                      toastSuccess('Task stopped')
                      reloadTasks(false)
                    }).catch(() => {
                      toastError('Error stopping task')
                    })
                } else {
                  startTask(task.id)
                    .then(() => {
                      toastSuccess('Task started')
                      reloadTasks(false)
                    }).catch(() => {
                      toastError('Error starting task')
                    })
                }
              }}
            />
            <div>
              {task.name}
            </div>
          </div>
        ))}
      </Card>

      <br />

      <Card>
        <Form
          onSubmit={() => {
            createTask({
              name: name as string,
            }).then(() => {
              setName(null)
              toastSuccess('Task created')
              reloadTasks(false)
            }).catch((error) => {
              console.error(error)
              toastError('Error creating task')
            })
          }}
        >

          <Input
            label='Name'
            value={name}
            placeholder='Enter task name'
            onChange={(newValue) => setName(newValue as string | null)}
            schema={YupRequiredString}
          />

          <br />

          <Button
            label='Create task'
            type='submit'
            disabled={false}
            loading={false}
          />
        </Form>

      </Card>

      <br />
    </div>
  );
}

export default App;
