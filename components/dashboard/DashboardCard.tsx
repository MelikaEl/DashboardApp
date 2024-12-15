import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}

/*
The `interface DashboardCardProps` is used in this code for several important reasons:

1. **Type Safety**: 
   - It defines the exact shape of props that the `DashboardCard` component can receive
   - TypeScript will show errors if you try to pass wrong types or miss required props

2. **Props Documentation**:
   - It clearly documents what props the component expects
   - Other developers can easily understand what data they need to pass to the component

3. **Code Clarity**:
   ```typescript
   const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
   ```
   - The interface makes it clear that this component needs:
     - `title` (string)
     - `count` (number)
     - `icon` (React element of type LucideIcon)

4. **Development Experience**:
   - Provides autocomplete in IDE
   - Shows inline documentation
   - Catches prop-related errors during development

Example usage:
```typescript
<DashboardCard 
  title="Users"
  count={42}
  icon={<UserIcon />}  // Must be a Lucide icon
/>
```

If you tried to use the component incorrectly (like passing a string for count), TypeScript would show an error before you even run the code, helping prevent bugs.

*/

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className='bg-slate-100 dark:bg-slate-800 p-4 pb-0'>
      <CardContent>
        <h3 className='text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200'>
          {title}
        </h3>
        <div className='flex gap-5 justify-center items-center'>
          {icon}
          <h3 className='text-5xl font-semibold text-slate-500 dark:text-slate-200'>
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
