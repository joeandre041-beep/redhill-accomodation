import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Wifi,
  Car,
  Utensils,
  Sofa,
  BedDouble,
  Users,
  Check,
  X,
  MapPin,
  Phone,
  Mail,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { Logo } from './components/Icons';
import { cn } from './utils/cn';
import { rooms, sharedSpaces, gardenImage, type Room } from './data/rooms';

type Page = 'home' | 'rooms';

function usePage(): [Page, (p: Page) => void] {
  const read = (): Page =>
    window.location.hash.replace('#/', '').replace('#', '') === 'rooms' ? 'rooms' : 'home';

  const [page, setPage] = useState<Page>(read);

  useEffect(() => {
    const onHash = () => setPage(read());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (p: Page) => {
    window.location.hash = p === 'home' ? '/' : '/rooms';
    setPage(p);
    window.scrollTo(0, 0);
  };

  return [page, go];
}

/* ---------------- Home ---------------- */
function Home({ onExplore }: { onExplore: () => void }) {
  useEffect(() => {
    document.documentElement.classList.add('home-lock');
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.classList.remove('home-lock');
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={gardenImage}
          alt="The stone garden arch at Redhill Homely"
          className="h-full w-full object-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/55 via-ink-900/35 to-ink-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/50 via-transparent to-ink-900/30" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-10 pt-6">
        <div className="flex items-center gap-2.5 rise">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur border border-white/20">
            <Logo className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-[17px] font-semibold tracking-tight">Redhill Homely</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">A place to rest</p>
          </div>
        </div>
        <a
          href="tel:+441234567890"
          className="rise rise-1 hidden sm:inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/20 transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          +44 1234 567 890
        </a>
      </header>

      {/* Center welcome */}
      <main className="relative z-10 flex h-[calc(100dvh-8.5rem)] flex-col items-center justify-center px-6 text-center">
        <div className="rise rise-1 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-rh-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-soft-pulse" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Rooms available tonight
        </div>

        <h1 className="rise rise-2 mt-6 font-serif text-[48px] sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl">
          Welcome home,
          <br />
          <span className="italic text-gradient">traveller.</span>
        </h1>

        <p className="rise rise-3 mt-6 max-w-lg text-base sm:text-lg text-white/80 leading-relaxed">
          A small, cozy guesthouse for short stays. Soft beds, a shared kitchen,
          a quiet garden — and nothing you don't need.
        </p>

        <button
          onClick={onExplore}
          className="rise rise-4 btn-shine mt-9 group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-ink-900 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] hover:shadow-[0_22px_60px_-10px_rgba(0,0,0,0.55)]"
        >
          View rooms &amp; amenities
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </main>

      {/* Bottom amenity strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-10 pb-6">
        <div className="rise rise-5 mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { icon: Wifi, label: 'Free Wi-Fi' },
            { icon: Car, label: 'Free parking' },
            { icon: Utensils, label: 'Shared kitchen' },
            { icon: Sofa, label: 'Sitting area' },
            { icon: Leaf, label: 'Private garden' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-2 text-[12px] sm:text-[13px] font-medium text-white/90"
            >
              <Icon className="h-3.5 w-3.5 text-rh-200" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Rooms page ---------------- */
function RoomsPage({
  onBack,
  onEnquire,
}: {
  onBack: () => void;
  onEnquire: (room?: Room) => void;
}) {
  const [filter, setFilter] = useState<'all' | 'available'>('all');
  const [open, setOpen] = useState<Room | null>(null);

  const visible = filter === 'available' ? rooms.filter((r) => r.status === 'available') : rooms;
  const availableCount = rooms.filter((r) => r.status === 'available').length;

  return (
    <div className="min-h-screen bg-rh-50 text-ink-900">
      <header className="sticky top-0 z-40 glass-light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-rh-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rh-700 text-white">
              <Logo className="h-4 w-4" />
            </span>
            <span className="font-serif font-semibold text-[15px]">Redhill Homely</span>
          </div>

          <button
            onClick={() => onEnquire()}
            className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-rh-700 px-4 py-2 text-[13px] font-semibold text-white shadow-md"
          >
            Enquire
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        {/* Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rh-700">
              Four rooms · One homely house
            </p>
            <h1 className="mt-1.5 font-serif text-3xl sm:text-4xl tracking-tight text-ink-900">
              Rooms &amp; amenities
            </h1>
            <p className="mt-2 text-ink-500 max-w-xl text-[15px] leading-relaxed">
              A small, cozy guesthouse. Every room has an ensuite, Wi-Fi and a comfortable bed.
              The kitchen, sitting lounge and garden are shared by all guests.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'rounded-full px-4 py-2 text-[13px] font-semibold transition-all',
                filter === 'all' ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 border border-rh-200 hover:border-rh-400'
              )}
            >
              All rooms
            </button>
            <button
              onClick={() => setFilter('available')}
              className={cn(
                'rounded-full px-4 py-2 text-[13px] font-semibold transition-all inline-flex items-center gap-2',
                filter === 'available' ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 border border-rh-200 hover:border-rh-400'
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available ({availableCount})
            </button>
          </div>
        </div>

        {/* Room grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {visible.map((room) => (
            <article
              key={room.id}
              className="group card-lift overflow-hidden rounded-2xl bg-white border border-rh-100 shadow-[0_8px_30px_-18px_rgba(63,31,19,0.25)]"
            >
              <button
                onClick={() => setOpen(room)}
                className="block w-full text-left"
                aria-label={`View ${room.name}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover img-zoom"
                  />
                  <div className="absolute top-3 left-3">
                    {room.status === 'available' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/95 text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        Vacant
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                        Occupied · from {room.availableFrom}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 font-serif text-sm font-semibold text-ink-900">
                    ${room.price}
                    <span className="text-[11px] font-sans font-medium text-ink-500"> / night</span>
                  </div>
                </div>
              </button>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-ink-900">{room.name}</h2>
                    <p className="mt-0.5 text-[13px] text-ink-500">{room.tagline}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-ink-500">
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="h-3.5 w-3.5" /> {room.bed}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> Sleeps {room.sleeps}
                  </span>
                  <span>{room.size}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.features.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-rh-50 border border-rh-100 px-2.5 py-0.5 text-[11px] text-ink-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setOpen(room)}
                    className="text-[13px] font-semibold text-rh-700 hover:text-rh-900 inline-flex items-center gap-1"
                  >
                    See more <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    disabled={room.status !== 'available'}
                    onClick={() => onEnquire(room)}
                    className={cn(
                      'rounded-full px-4 py-2 text-[13px] font-semibold transition-all',
                      room.status === 'available'
                        ? 'bg-rh-700 text-white hover:bg-rh-800 btn-shine'
                        : 'bg-rh-100 text-ink-500 cursor-not-allowed'
                    )}
                  >
                    {room.status === 'available' ? 'Book this room' : 'Not available'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Shared amenities */}
        <section className="mt-12">
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rh-700">
              Shared by all guests
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl tracking-tight">
              Kitchen, sitting area &amp; garden
            </h2>
            <p className="mt-2 text-ink-500 text-[15px] max-w-2xl leading-relaxed">
              Redhill Homely is a small house, not a hotel. You'll share a proper kitchen,
              a covered sitting lounge, free parking and the garden — plus fast Wi-Fi throughout.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {sharedSpaces.map((s) => (
              <figure
                key={s.id}
                className="overflow-hidden rounded-2xl bg-white border border-rh-100 card-lift"
              >
                <div className="aspect-[4/3] overflow-hidden group">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover img-zoom" />
                </div>
                <figcaption className="p-4">
                  <h3 className="font-serif text-lg font-semibold">{s.name}</h3>
                  <p className="mt-1 text-[13px] text-ink-500 leading-relaxed">{s.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Wifi, title: 'Free Wi-Fi', sub: 'Fast fibre, whole house' },
              { icon: Car, title: 'Free parking', sub: 'Off-street, on site' },
              { icon: Sparkles, title: 'Daily linen', sub: 'Fresh towels on request' },
              { icon: MapPin, title: 'Quiet street', sub: 'A short walk to town' },
            ].map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="rounded-xl bg-white border border-rh-100 p-4 flex items-start gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rh-100 text-rh-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink-900">{title}</p>
                  <p className="text-[11px] text-ink-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-rh-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-500">
          <p className="font-serif text-ink-900">Redhill Homely</p>
          <p>24 Station Road, Redhill · stay@redhillhomely.co</p>
          <p className="text-xs">© {new Date().getFullYear()} · A small place to rest</p>
        </div>
      </footer>

      {open && (
        <RoomModal
          room={open}
          onClose={() => setOpen(null)}
          onEnquire={() => {
            setOpen(null);
            onEnquire(open);
          }}
        />
      )}
    </div>
  );
}

function RoomModal({
  room,
  onClose,
  onEnquire,
}: {
  room: Room;
  onClose: () => void;
  onEnquire: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-title"
    >
      <button
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl">
        <div className="relative aspect-[16/9]">
          <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 hover:bg-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-3">
            {room.status === 'available' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                Vacant tonight
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 text-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                Occupied · available {room.availableFrom}
              </span>
            )}
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="room-title" className="font-serif text-3xl font-semibold text-ink-900">
                {room.name}
              </h2>
              <p className="mt-1 text-ink-500">{room.tagline}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-serif text-3xl font-semibold">${room.price}</p>
              <p className="text-xs text-ink-500">per night</p>
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-700">{room.description}</p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink-700">
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-rh-700" /> {room.bed}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-rh-700" /> Sleeps {room.sleeps}
            </span>
            <span>{room.size}</span>
          </div>

          <ul className="mt-5 grid sm:grid-cols-2 gap-2">
            {room.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                <Check className="h-4 w-4 text-sage-600" /> {f}
              </li>
            ))}
            <li className="flex items-center gap-2 text-sm text-ink-700">
              <Check className="h-4 w-4 text-sage-600" /> Free Wi-Fi
            </li>
            <li className="flex items-center gap-2 text-sm text-ink-700">
              <Check className="h-4 w-4 text-sage-600" /> Access to kitchen &amp; garden
            </li>
          </ul>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              disabled={room.status !== 'available'}
              onClick={onEnquire}
              className={cn(
                'btn-shine flex-1 rounded-full px-5 py-3.5 text-sm font-semibold',
                room.status === 'available'
                  ? 'bg-rh-700 text-white'
                  : 'bg-rh-100 text-ink-500 cursor-not-allowed'
              )}
            >
              {room.status === 'available' ? 'Enquire to book' : `Available from ${room.availableFrom}`}
            </button>
            <button
              onClick={onClose}
              className="rounded-full px-5 py-3.5 text-sm font-semibold border border-rh-200 text-ink-700 hover:bg-rh-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquireModal({
  room,
  onClose,
}: {
  room?: Room | null;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 fade-in" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-rh-50 text-ink-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-semibold">We've got your note</h2>
            <p className="mt-2 text-sm text-ink-500 leading-relaxed">
              We'll reply within a few hours to confirm your stay
              {room ? ` in ${room.name}` : ''}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-rh-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl font-semibold pr-8">
              {room ? `Book ${room.name}` : 'Enquire about a stay'}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Tell us your dates — we'll confirm availability shortly.
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <label className="block">
                <span className="text-[12px] font-medium text-ink-700">Your name</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-rh-200 bg-rh-50 px-3.5 py-2.5 text-sm focus:border-rh-500"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="block">
                <span className="text-[12px] font-medium text-ink-700">Email</span>
                <input
                  required
                  type="email"
                  className="mt-1 w-full rounded-xl border border-rh-200 bg-rh-50 px-3.5 py-2.5 text-sm focus:border-rh-500"
                  placeholder="you@email.com"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[12px] font-medium text-ink-700">Arrive</span>
                  <input
                    required
                    type="date"
                    className="mt-1 w-full rounded-xl border border-rh-200 bg-rh-50 px-3 py-2.5 text-sm focus:border-rh-500"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-medium text-ink-700">Leave</span>
                  <input
                    required
                    type="date"
                    className="mt-1 w-full rounded-xl border border-rh-200 bg-rh-50 px-3 py-2.5 text-sm focus:border-rh-500"
                  />
                </label>
              </div>
              {!room && (
                <label className="block">
                  <span className="text-[12px] font-medium text-ink-700">Preferred room</span>
                  <select className="mt-1 w-full rounded-xl border border-rh-200 bg-rh-50 px-3.5 py-2.5 text-sm">
                    <option>Any available</option>
                    {rooms.map((r) => (
                      <option key={r.id} disabled={r.status !== 'available'}>
                        {r.name} {r.status !== 'available' ? '(occupied)' : ''}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <button
                type="submit"
                className="btn-shine mt-2 w-full rounded-full bg-rh-700 py-3 text-sm font-semibold text-white"
              >
                Send enquiry
              </button>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-500">
                <Mail className="h-3 w-3" /> We'll reply to your email — no payment now.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [page, go] = usePage();
  const [enquire, setEnquire] = useState<Room | null | undefined>(undefined);
  // undefined = closed, null = general enquire, Room = specific room

  return (
    <>
      {page === 'home' ? (
        <Home onExplore={() => go('rooms')} />
      ) : (
        <RoomsPage onBack={() => go('home')} onEnquire={(r) => setEnquire(r ?? null)} />
      )}
      {enquire !== undefined && (
        <EnquireModal room={enquire} onClose={() => setEnquire(undefined)} />
      )}
    </>
  );
}
