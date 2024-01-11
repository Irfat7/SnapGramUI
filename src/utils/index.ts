export const formatDateAgo = (dateString: string): string => {
    const currentDate: Date = new Date();
    const inputDate: Date = new Date(dateString);

    const timeDifference: number = currentDate.getTime() - inputDate.getTime();
    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 1) {
        return `${days} days ago`;
    } else if (days === 1) {
        return '1 day ago';
    } else if (hours > 1) {
        return `${hours} hours ago`;
    } else if ((hours === 1) || (minutes > 1)) {
        return `${hours === 1 ? '1 hour' : `${minutes} minutes`} ago`;
    } else if (minutes === 1) {
        return '1 minute ago';
    } else {
        return 'just now';
    }
}