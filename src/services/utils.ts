export function getBearerToken(): string {
    return window.localStorage.getItem('token') || '';
}