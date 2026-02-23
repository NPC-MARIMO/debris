import { notifications } from '@/data/mockData';
import GlassCard from './GlassCard';
import { AlertTriangle, AlertCircle } from 'lucide-react';

const Notifications = () => {
  return (
    <GlassCard title="Notifications">
      <div className="space-y-3">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`p-3 rounded-lg border ${
              notif.type === 'alert'
                ? 'border-destructive/30 bg-destructive/8'
                : 'border-warning/30 bg-warning/8'
            }`}
          >
            <div className="flex items-start gap-2">
              {notif.type === 'alert' ? (
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              )}
              <div className="min-w-0">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${
                  notif.type === 'alert' ? 'text-destructive' : 'text-warning'
                }`}>
                  {notif.type === 'alert' ? 'ALERT' : 'WARNING'}: {notif.satellite}
                </p>
                <p className="text-sm text-foreground mt-1 font-medium">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default Notifications;
